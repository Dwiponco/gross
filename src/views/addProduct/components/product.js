import React, { useState } from "react";
import { Input, DatePicker, FormItem, Select, Segment } from "components/ui";
import { Field } from "formik";
import {
  AdaptableCard,
  FormNumericInput,
  SegmentItemOption,
} from "components/shared";
import { HiChevronRight, HiChevronDown, HiCheckCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import {
  listDiscountType,
  listProgramType,
  categories,
  listPaket,
  segmentSelections,
} from "./data";

const Product = (props) => {
  const { values, touched, errors } = props;
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };

  const validate = (value) => {
    if (value > 99999) return "Not allow";
    if (value < 0) return "Not allow";

    return;
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={onCollapse}
        >
          <span className="text-lg">
            {collapse ? <HiChevronRight /> : <HiChevronDown />}
          </span>
          <h5>Product</h5>
        </div>
        <hr className="mx-3 w-full" />
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: collapse ? 0 : 1,
          height: collapse ? 0 : "auto",
        }}
        transition={{ duration: 0.3 }}
      >
        <AdaptableCard className="mb-4" divider>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-6">
            <div className="lg:col-span-1">
              <FormItem label="No Program">
                <Field
                  type="text"
                  name="noProgram"
                  placeholder="Please Input"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Description"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
              >
                <Field
                  textArea
                  type="text"
                  name="description"
                  placeholder="Please Input"
                  component={Input}
                />
              </FormItem>
            </div>

            <div className="lg:col-span-1">
              <FormItem label="No Program">
                <Field
                  type="text"
                  name="noProgram"
                  placeholder="Please Input"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Description"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
              >
                <Field
                  textArea
                  type="text"
                  name="description"
                  placeholder="Please Input"
                  component={Input}
                />
              </FormItem>
            </div>

            <div className="lg:col-span-1">
              <FormItem
                label="Paket"
                invalid={errors.paket && touched.paket}
                errorMessage={errors.paket}
              >
                <Field name="paket">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={listPaket}
                      value={listPaket.filter(
                        (paket) => paket.value === values.paket
                      )}
                      onChange={(option) =>
                        form.setFieldValue(field.name, option.value)
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
          </div>
        </AdaptableCard>
      </motion.div>
    </>
  );
};

export default Product;
