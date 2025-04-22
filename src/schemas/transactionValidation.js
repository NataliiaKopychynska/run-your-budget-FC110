import * as yup from "yup";

const schema = yup.object({
    type: yup.string().oneOf(["income", "expense"]).required(),
    sum: yup.number().typeError("Must be a number").positive().required(),
    date: yup.date().required(),
    category: yup
        .string()
        .when("type", ([type], schema) =>
            type === "expense" ? schema.required("Select category") : schema
        ),
    comment: yup.string().max(100).required(),
});

export default schema;