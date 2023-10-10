import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required(
    <span className="mono negative">Amount is required</span>
  ),
  date: Yup.date()
    .required(<span className="mono negative">Date is required</span>)
    .nullable(),
});

export default validationSchema;
