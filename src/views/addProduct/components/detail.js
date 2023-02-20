import React, { useState } from "react";
import { Input, Button, FormItem, Select } from "components/ui";
import { AdaptableCard } from "components/shared";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";
import { Field, FieldArray, getIn } from "formik";
import { HiMinus } from "react-icons/hi";
import { itemGroup, listLevelItem, principalCode } from "./data";

const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name);
    const touch = getIn(form.touched, name);
    return {
        errorMessage: error || "",
        invalid: typeof touch === "undefined" ? false : error && touch,
    };
};

const DetailProgram = (props) => {
    const { values, errors } = props;
    const [collapse, setCollapse] = useState(false);

    const onCollapse = () => {
        setCollapse(!collapse);
    };
    const detail = values.detail;

    const validate = (value) => {
        if (value > 99999) return "Not allow";
        if (value < 0) return "Not allow";

        return;
    };
    const validateDiscount = (value) => {
        if (value > 100) return "Not allow";
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
                    <h5>Detail</h5>
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
                        <FieldArray name="detail">
                            {({ form, remove, push }) => (
                                <>
                                    <div>
                                        {detail && detail.length > 0
                                            ? detail.map((_, index) => {
                                                const levelItemFeedBack = fieldFeedback(form, `detail[${index}].levelItem`);
                                                const principalCodeFeedBack = fieldFeedback(form, `detail[${index}].principalCode`);
                                                const itemGroupFeedBack = fieldFeedback(form, `detail[${index}].itemGroup`);
                                                const itemCodeFeedBack = fieldFeedback(form, `detail[${index}].itemCode`);
                                                const qtyFromFeedBack = fieldFeedback(form, `detail[${index}].qtyFrom`);
                                                const qtyToFeedBack = fieldFeedback(form, `detail[${index}].qtyTo`);
                                                const discountFeedBack = fieldFeedback(form, `detail[${index}].discount`);

                                                return (
                                                    <div
                                                        className="grid grid-flow-col auto-cols-max gap-4"
                                                        key={index}
                                                    >
                                                        <FormItem label={index === 0 ? "No" : false}>
                                                            <Button
                                                                type="button"
                                                                className="cursor-auto self-center h-11"
                                                                size="sm"
                                                            >
                                                                {" "}
                                                                {index + 1}{" "}
                                                            </Button>
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Level Item" : false}
                                                            invalid={levelItemFeedBack.invalid}
                                                            errorMessage={levelItemFeedBack.errorMessage}
                                                            className="w-[150px]"
                                                        >
                                                            <Field name={`detail[${index}].levelItem`}>
                                                                {({ field, form }) => (
                                                                    <Select
                                                                        field={field}
                                                                        form={form}
                                                                        options={listLevelItem}
                                                                        value={listLevelItem.filter(
                                                                            (levelItem) =>
                                                                                levelItem.value ===
                                                                                values.detail[index].levelItem
                                                                        )}
                                                                        onChange={(option) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                option.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Principal Code" : false}
                                                            invalid={principalCodeFeedBack.invalid}
                                                            errorMessage={
                                                                principalCodeFeedBack.errorMessage
                                                            }
                                                            className="min-w-[200px]"
                                                        >
                                                            <Field name={`detail[${index}].principalCode`}>
                                                                {({ field, form }) => (
                                                                    <Select
                                                                        field={field}
                                                                        form={form}
                                                                        options={principalCode}
                                                                        value={principalCode.filter(
                                                                            (principalCode) =>
                                                                                principalCode.value ===
                                                                                values.detail[index].principalCode
                                                                        )}
                                                                        onChange={(option) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                option.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Item Group" : false}
                                                            invalid={itemGroupFeedBack.invalid}
                                                            errorMessage={itemGroupFeedBack.errorMessage}
                                                            className="min-w-[100px]"
                                                        >
                                                            <Field name={`detail[${index}].itemGroup`}>
                                                                {({ field, form }) => (
                                                                    <Select
                                                                        field={field}
                                                                        form={form}
                                                                        options={itemGroup}
                                                                        value={itemGroup.filter(
                                                                            (itemGroup) =>
                                                                                itemGroup.value ===
                                                                                values.detail[index].itemGroup
                                                                        )}
                                                                        onChange={(option) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                option.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Item Code" : false}
                                                            invalid={itemCodeFeedBack.invalid}
                                                            errorMessage={itemCodeFeedBack.errorMessage}
                                                            className="w-28"
                                                        >
                                                            <Field
                                                                invalid={errors.invalid}
                                                                name={`detail[${index}].itemCode`}
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Qty From" : false}
                                                            invalid={qtyFromFeedBack.invalid}
                                                            errorMessage={qtyFromFeedBack.errorMessage}
                                                            className="w-20"
                                                        >
                                                            <Field
                                                                invalid={errors.invalid}
                                                                name={`detail[${index}].qtyFrom`}
                                                                component={Input}
                                                                validate={validate}
                                                                type="number"
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Qty To" : false}
                                                            invalid={qtyToFeedBack.invalid}
                                                            errorMessage={qtyToFeedBack.errorMessage}
                                                            className="w-20"
                                                        >
                                                            <Field
                                                                invalid={errors.invalid}
                                                                name={`detail[${index}].qtyTo`}
                                                                component={Input}
                                                                validate={validate}
                                                                type="number"
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label={index === 0 ? "Discount" : false}
                                                            invalid={discountFeedBack.invalid}
                                                            errorMessage={discountFeedBack.errorMessage}
                                                            className="w-20 min-w-full "
                                                        >
                                                            <Field
                                                                invalid={errors.invalid}
                                                                name={`detail[${index}].discount`}
                                                                component={Input}
                                                                validate={validateDiscount}
                                                                type="number"
                                                                suffix=" %"
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
                                    </div>
                                    <Button
                                        type="button"
                                        className="ltr:mr-2 rtl:ml-2"
                                        onClick={() => {
                                            push({
                                                levelItem: "",
                                                principalCode: "",
                                                itemGroup: "",
                                                itemCode: "",
                                                qtyFrom: "",
                                                qtyTo: "",
                                                discount: "",
                                            });
                                        }}
                                    >
                                        Add line
                                    </Button>
                                </>
                            )}
                        </FieldArray>
                    </div>
                </AdaptableCard>
            </motion.div>
        </>
    );
};

export default DetailProgram;
