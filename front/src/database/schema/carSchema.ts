import { tableSchema } from "@nozbe/watermelondb";

const carSchema = tableSchema({
  name: "cars",
  columns: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "about",
      type: "string",
    },
    {
      name: "price",
      type: "number",
    },
    {
      name: "fuel_type",
      type: "string",
    },
    {
      name: "thumbnail",
      type: "string",
    },
    {
      name: "period",
      type: "string",
    },
    {
      name: "brand",
      type: "string",
    },
  ],
});

export { carSchema };
