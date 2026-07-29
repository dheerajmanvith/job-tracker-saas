import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { applicationSchema } from "../validation/applicationSchema";
import api from "../services/api";

function AddApplicationForm() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: "",
      role: "",
      status: "APPLIED",
      appliedDate: "",
      notes: "",
    },
  });


  const onSubmit = async (data) => {
    try {

      const response = await api.post("/applications", {
        company: data.company,
        role: data.role,
        status: data.status,
        notes: data.notes,
      });


      console.log(response.data);


      alert("Application Added Successfully!");


      reset();


      // Go to applications page after successful creation
      navigate("/applications");


    } catch (error) {

      console.error(error);


      if (error.response) {

        alert(
          error.response.data.error ||
          error.response.data.msg
        );

      } else {

        alert("Server Error");

      }

    }
  };


  return (
    <div className="form-container">

      <h2>Add Application</h2>


      <form onSubmit={handleSubmit(onSubmit)}>


        <Input
          label="Company"
          placeholder="Enter company"
          error={errors.company?.message}
          {...register("company")}
        />


        <Input
          label="Role"
          placeholder="Enter role"
          error={errors.role?.message}
          {...register("role")}
        />


        <div className="input-group">

          <label>Status</label>


          <select {...register("status")}>

            <option value="APPLIED">
              Applied
            </option>

            <option value="PHONE_SCREEN">
              Phone Screen
            </option>

            <option value="INTERVIEW">
              Interview
            </option>

            <option value="OFFER">
              Offer
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>


          {errors.status && (
            <p className="error">
              {errors.status.message}
            </p>
          )}

        </div>


        <Input
          label="Applied Date"
          type="date"
          error={errors.appliedDate?.message}
          {...register("appliedDate")}
        />


        <div className="input-group">

          <label>Notes</label>


          <textarea
            rows="5"
            placeholder="Enter notes..."
            {...register("notes")}
          />


          {errors.notes && (
            <p className="error">
              {errors.notes.message}
            </p>
          )}

        </div>


        <Button
          type="submit"
          className="submit-btn"
        >
          Add Application
        </Button>


      </form>

    </div>
  );
}


export default AddApplicationForm;