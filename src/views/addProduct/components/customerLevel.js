import React, { useState } from "react";
import { Input, Button, FormItem, Select } from "components/ui";
import { AdaptableCard } from "components/shared";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";
import { Field, FieldArray, getIn } from "formik";
import { HiMinus } from "react-icons/hi";
import {
  listCustomer,
  listGroupLevel,
  listGroupLevelCs,
} from "./data";

const fieldFeedback = (form, name) => {
  const error = getIn(form.errors, name);
  const touch = getIn(form.touched, name);
  return {
    errorMessage: error || "",
    invalid: typeof touch === "undefined" ? false : error && touch,
  };
};

const CustomerLevel = (props) => {
  const { values, touched, errors } = props;
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };
  const customerLevelChild = values.customerLevelChild;
  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 cursor-pointer select-none min-w-[18%]"
          onClick={onCollapse}
        >
          <span className="text-lg">
            {collapse ? <HiChevronRight /> : <HiChevronDown />}
          </span>
          <h5>Customer Level</h5>
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
          <div className="px-6">
            <div className="w w-[50%]">
              <FormItem
                label="Customer Level"
                invalid={errors.customerLevel && touched.customerLevel}
                errorMessage={errors.customerLevel}
              >
                <Field name="customerLevel">
                  {({ field, form }) => {
                    return (
                      <Select
                        field={field}
                        form={form}
                        options={listCustomer}
                        value={listCustomer.filter(
                          (customerLevel) =>
                            customerLevel.value === values.customerLevel
                        )}
                        onChange={(option) => {
                          return form.setFieldValue(field.name, option.value)
                        }}
                      />
                    );
                  }}
                </Field>
              </FormItem>
            </div>
            <FieldArray name="customerLevelChild">
              {({ form, remove, push }) => (
                <div>
                  {customerLevelChild && customerLevelChild.length > 0
                    ? customerLevelChild.map((_, index) => {
                      const groupLevelFeedBack = fieldFeedback(form, `customerLevelChild[${index}].groupLevel`);
                      const csLevelChildFeedBack = fieldFeedback(form, `customerLevelChild[${index}].csLevelChild`);
                      const descriptionFeedBack = fieldFeedback(form, `customerLevelChild[${index}].description`);
                      return (
                        <div
                          className="grid grid-flow-col auto-cols-max gap-4"
                          key={index}
                        >
                          <FormItem label={index === 0 ? "No" : false}>
                            <Button type="button" className="ltr:mr-2 rtl:ml-2 cursor-auto h-11" size="sm">{index + 1}</Button>
                          </FormItem>
                          <FormItem
                            label={index === 0 ? "Customer Level" : false}
                            invalid={csLevelChildFeedBack.invalid}
                            errorMessage={csLevelChildFeedBack.errorMessage}
                            className="min-w-[200px]"
                          >
                            <Field
                              invalid={csLevelChildFeedBack.invalid}
                              type="text"
                              name={`customerLevelChild[${index}].csLevelChild`}
                              component={Input}
                              value={values.customerLevel ? values.customerLevel.replace(/_/g, ' ') : values.customerLevel}
                              disabled={true}
                            />
                          </FormItem>
                          <FormItem
                            label={index === 0 ? "Group Level" : false}
                            invalid={groupLevelFeedBack.invalid}
                            errorMessage={groupLevelFeedBack.errorMessage}
                            className="min-w-[200px]"
                          >
                            <Field
                              name={`customerLevelChild[${index}].groupLevel`}
                            >
                              {({ field, form }) => {
                                return (
                                  <Select
                                    field={field}
                                    form={form}
                                    options={
                                      values.customerLevel === "CUSTOMER"
                                        ? listGroupLevelCs
                                        : listGroupLevel
                                    }
                                    value={
                                      values.customerLevel === "CUSTOMER"
                                        ? listGroupLevelCs.filter(
                                          (groupLevel) =>
                                            groupLevel.value ===
                                            values.customerLevelChild[index]
                                              .groupLevel
                                        )
                                        : listGroupLevel.filter(
                                          (groupLevel) =>
                                            groupLevel.value ===
                                            values.customerLevelChild[index]
                                              .groupLevel
                                        )
                                    }
                                    onChange={(option) =>
                                      form.setFieldValue(
                                        field.name,
                                        option.value
                                      )
                                    }
                                  />
                                );
                              }}
                            </Field>
                          </FormItem>
                          <FormItem
                            label={index === 0 ? "Description" : false}
                            invalid={descriptionFeedBack.invalid}
                            errorMessage={descriptionFeedBack.errorMessage}
                          >
                            <Field
                              invalid={descriptionFeedBack.invalid}
                              type="text"
                              name={`customerLevelChild[${index}].description`}
                              component={Input}
                            />
                          </FormItem>
                          <Button
                            className={index === 0 ? "self-center" : ""}
                            shape="circle"
                            size="sm"
                            icon={<HiMinus />}
                            type="button"
                            onClick={() => remove(index)}
                          />
                        </div>
                      );
                    })
                    : null}
                  <Button
                    type="button"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={() => {
                      push({
                        csLevelChild: "",
                        groupLevel: "",
                        description: "",
                      });
                    }}
                  >
                    Add line
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>
        </AdaptableCard>
      </motion.div>
    </>
  );
};

export default CustomerLevel;
