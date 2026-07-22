from flask import (
    Blueprint,
    jsonify,
    Response,
    stream_with_context,
    request
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    decode_token
)

import time
import json

from services.notification_service import NotificationService


notification_bp = Blueprint(
    "notification",
    __name__,
    url_prefix="/api/notifications"
)


# -----------------------------------------
# GET ALL NOTIFICATIONS
# -----------------------------------------

@notification_bp.route(
    "",
    methods=["GET"]
)
@jwt_required()
def get_notifications():

    user_id = get_jwt_identity()


    notifications = (
        NotificationService
        .get_user_notifications(user_id)
    )


    return jsonify([

        notification.to_dict()

        for notification in notifications

    ])



# -----------------------------------------
# GET UNREAD COUNT
# -----------------------------------------

@notification_bp.route(
    "/unread-count",
    methods=["GET"]
)
@jwt_required()
def unread_count():

    user_id = get_jwt_identity()


    count = (
        NotificationService
        .unread_count(user_id)
    )


    return jsonify({

        "count": count

    })



# -----------------------------------------
# MARK AS READ
# -----------------------------------------

@notification_bp.route(
    "/<int:notification_id>/read",
    methods=["PUT"]
)
@jwt_required()
def mark_read(notification_id):

    user_id = get_jwt_identity()


    notification = (
        NotificationService
        .mark_as_read(
            notification_id,
            user_id
        )
    )


    if not notification:

        return jsonify({

            "message": "Notification not found"

        }), 404



    return jsonify({

        "message": "Notification marked as read"

    })



# -----------------------------------------
# REAL TIME SSE STREAM
# -----------------------------------------
# NOTE:
# Browser EventSource cannot send Authorization headers.
# Token is received through query parameter.
#
# Example:
# /api/notifications/stream?token=JWT_TOKEN
# -----------------------------------------


@notification_bp.route(
    "/stream",
    methods=["GET"]
)
def notification_stream():


    token = request.args.get(
        "token"
    )


    if not token:

        return jsonify({

            "message": "Token missing"

        }), 401



    try:

        decoded = decode_token(
            token
        )


        user_id = decoded["sub"]


    except Exception:


        return jsonify({

            "message": "Invalid token"

        }), 401




    def event_stream():


        last_count = -1



        while True:


            current_count = (
                NotificationService
                .unread_count(user_id)
            )



            if current_count != last_count:


                data = {


                    "unread_count":
                    current_count

                }



                yield (

                    f"data: {json.dumps(data)}\n\n"

                )



                last_count = current_count



            time.sleep(5)



    return Response(

        stream_with_context(
            event_stream()
        ),

        mimetype="text/event-stream",

        headers={

            "Cache-Control": "no-cache",

            "X-Accel-Buffering": "no"

        }

    )