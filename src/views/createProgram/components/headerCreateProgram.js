import React, { useState } from "react";
import {
  Input,
  DatePicker,
  FormItem,
  Select,
  Segment,
} from "components/ui";
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

const HeaderCreateProgram = (props) => {
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
          <h5>Program</h5>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6">
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
                label="Approval Code"
                invalid={errors.approvalCode && touched.approvalCode}
                errorMessage={errors.approvalCode}
              >
                <Field
                  type="text"
                  name="approvalCode"
                  placeholder="Please Input"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Ordet Type"
                invalid={errors.orderType && touched.orderType}
                errorMessage={errors.orderType}
              >
                <Field name="orderType">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={categories}
                      value={categories.filter(
                        (category) => category.value === values.orderType
                      )}
                      onChange={(option) =>
                        form.setFieldValue(field.name, option.value)
                      }
                    />
                  )}
                </Field>
              </FormItem>
              <FormItem
                label="Progam Type"
                invalid={errors.programType && touched.programType}
                errorMessage={errors.programType}
              >
                <Field name="programType">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={listProgramType}
                      value={listProgramType.filter(
                        (programType) =>
                          programType.value === values.programType
                      )}
                      onChange={(option) =>
                        form.setFieldValue(field.name, option.value)
                      }
                    />
                  )}
                </Field>
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
              <FormItem
                label="Remark"
                invalid={errors.remark && touched.remark}
                errorMessage={errors.remark}
              >
                <Field
                  textArea
                  type="text"
                  name="remark"
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
              <FormItem
                label="Diskon Type"
                invalid={errors.diskonType && touched.diskonType}
                errorMessage={errors.diskonType}
              >
                <Field name="diskonType">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={listDiscountType}
                      value={listDiscountType.filter(
                        (diskonType) => diskonType.value === values.diskonType
                      )}
                      onChange={(option) =>
                        form.setFieldValue(field.name, option.value)
                      }
                    />
                  )}
                </Field>
              </FormItem>
              <FormItem
                label="Date"
                invalid={errors.startDate && touched.startDate}
                errorMessage={errors.startDate || errors.endDate}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <Field name="startDate">
                      {({ field, form }) => (
                        <DatePicker
                          placeholder="Start"
                          field={field}
                          form={form}
                          value={field.value}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                          invalid={errors.startDate && touched.startDate}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="lg:col-span-1 flex justify-center">
                    <p className="self-center">To</p>
                  </div>
                  <div className="lg:col-span-2">
                    <Field name="endDate">
                      {({ field, form }) => (
                        <DatePicker
                          placeholder="End"
                          field={field}
                          form={form}
                          value={field.value}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                          invalid={errors.endDate && touched.endDate}
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </FormItem>
              <FormItem
                label="Value"
                invalid={(errors.minValue && touched.minValue) || (errors.maxValue && touched.maxValue)}
                errorMessage={errors.minValue || errors.maxValue}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <Field
                      type="text"
                      name="minValue"
                      placeholder="Please Input"
                    >
                      {({ field, form }) => {
                        return (
                          <FormNumericInput
                            thousandSeparator={true}
                            form={form}
                            field={field}
                            placeholder="Amount"
                            decimalScale={2}
                            onValueChange={(e) => {
                              form.setFieldValue(field.name, e.floatValue);
                            }}
                            value={field.value}
                            invalid={errors.minValue && touched.minValue}
                          />
                        );
                      }}
                    </Field>
                  </div>
                  <div className="lg:col-span-1 flex justify-center">
                    <p className="self-center">To</p>
                  </div>
                  <div className="lg:col-span-2">
                    <Field
                      type="text"
                      name="maxValue"
                      placeholder="Please Input"
                    >
                      {({ field, form }) => {
                        return (
                          <FormNumericInput
                            thousandSeparator={true}
                            form={form}
                            field={field}
                            placeholder="Amount"
                            decimalScale={2}
                            onValueChange={(e) => {
                              form.setFieldValue(field.name, e.floatValue);
                            }}
                            value={field.value}
                            invalid={errors.maxValue && touched.maxValue}
                          />
                        );
                      }}
                    </Field>
                  </div>
                </div>
              </FormItem>
              <FormItem
                label="Quantity"
                invalid={(errors.minQuantity && touched.minQuantity) || (errors.maxQuantity && touched.maxQuantity)}
                errorMessage={errors.minQuantity || errors.maxQuantity}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <Field
                      type="number"
                      name="minQuantity"
                      placeholder="Please Input"
                      component={Input}
                      // invalid={errors.invalid}
                      validate={validate}
                      invalid={errors.minQuantity && touched.minQuantity}
                    />
                  </div>
                  <div className="lg:col-span-1 flex justify-center">
                    <p className="self-center">To</p>
                  </div>
                  <div className="lg:col-span-2">
                    <Field
                      type="number"
                      name="maxQuantity"
                      placeholder="Please Input"
                      component={Input}
                      // invalid={errors.invalid}
                      validate={validate}
                      invalid={errors.maxQuantity && touched.maxQuantity}
                    />
                  </div>
                </div>
              </FormItem>
              <FormItem label="Status">
                <Field name="status">
                  {({ field, form }) => (
                    <Segment
                      className="w-full"
                      value={values.status}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    >
                      <div className="grid grid-cols-3 gap-4 w-full">
                        {segmentSelections.map((segment) => (
                          <Segment.Item
                            value={segment.value}
                            key={segment.value}
                          >
                            {({
                              ref,
                              active,
                              onSegmentItemClick,
                              disabled,
                            }) => {
                              return (
                                <div className="text-center">
                                  <SegmentItemOption
                                    hoverable
                                    ref={ref}
                                    active={active}
                                    disabled={disabled}
                                    defaultGutter={false}
                                    onSegmentItemClick={onSegmentItemClick}
                                    className="relative min-h-[80px] w-full"
                                    customCheck={
                                      <HiCheckCircle className="text-indigo-600 absolute top-2 right-2 text-lg" />
                                    }
                                  >
                                    <div className="flex flex-col items-start mx-4">
                                      <h6>{segment.value}</h6>
                                      <p>{segment.desc}</p>
                                    </div>
                                  </SegmentItemOption>
                                </div>
                              );
                            }}
                          </Segment.Item>
                        ))}
                      </div>
                    </Segment>
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

export default HeaderCreateProgram;
