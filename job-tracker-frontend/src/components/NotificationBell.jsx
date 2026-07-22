import {
    useState
} from "react";

import useNotifications from "../hooks/useNotifications";


function NotificationBell(){

    const {
        notifications,
        unreadCount,
        markAsRead
    } = useNotifications();


    const [
        open,
        setOpen
    ] = useState(false);



    return (

        <div className="relative">


            {/* Bell Button */}

            <button
                onClick={() => setOpen(!open)}
                className="
                    relative
                    p-2
                    rounded-full
                    hover:bg-gray-100
                "
            >

                🔔


                {
                    unreadCount > 0 && (

                        <span
                            className="
                                absolute
                                -top-1
                                -right-1
                                bg-red-500
                                text-white
                                text-xs
                                rounded-full
                                px-2
                                py-1
                            "
                        >
                            {unreadCount}
                        </span>

                    )
                }


            </button>



            {/* Dropdown */}

            {
                open && (

                    <div
                        className="
                            absolute
                            right-0
                            mt-2
                            w-80
                            bg-white
                            shadow-lg
                            rounded-lg
                            border
                            z-50
                        "
                    >

                        <div
                            className="
                                p-3
                                font-bold
                                border-b
                            "
                        >
                            Notifications
                        </div>



                        {
                            notifications.length === 0 ? (

                                <p
                                    className="
                                        p-4
                                        text-gray-500
                                    "
                                >
                                    No notifications
                                </p>


                            ) : (


                                notifications.map(
                                    (notification)=>(

                                    <div
                                        key={
                                            notification.id
                                        }

                                        onClick={() =>
                                            markAsRead(
                                                notification.id
                                            )
                                        }

                                        className="
                                            p-3
                                            border-b
                                            cursor-pointer
                                            hover:bg-gray-50
                                        "
                                    >

                                        <p
                                            className="
                                                font-semibold
                                            "
                                        >
                                            {
                                                notification.title
                                            }
                                        </p>


                                        <p
                                            className="
                                                text-sm
                                                text-gray-600
                                            "
                                        >
                                            {
                                                notification.message
                                            }
                                        </p>


                                    </div>

                                ))

                            )

                        }


                    </div>

                )
            }


        </div>

    );

}


export default NotificationBell;