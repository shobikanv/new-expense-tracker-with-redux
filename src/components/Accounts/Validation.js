import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(
    <span className="mono negative">Name is required</span>
  ),
  group: Yup.string().required(
    <span className="mono negative">Group is required</span>
  ),
  balance: Yup.number()
    .required(<span className="mono negative">Balance is required</span>)
    // .min(
    //   0,
    //   <span className="mono negative">
    //     Balance must be greater than or equal to 0
    //   </span>
    // ),
});

export default validationSchema;
