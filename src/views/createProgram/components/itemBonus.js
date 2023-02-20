import React, { useState } from "react";
import { Input, Button, FormItem } from "components/ui";
import { AdaptableCard } from "components/shared";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";
import { Field, FieldArray, getIn } from "formik";
import { HiMinus } from "react-icons/hi";

const fieldFeedback = (form, name) => {
  const error = getIn(form.errors, name);
  const touch = getIn(form.touched, name);
  return {
    errorMessage: error || "",
    invalid: typeof touch === "undefined" ? false : error && touch,
  };
};

const ItemBonus = (props) => {
  const { values } = props;
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };
  const itemBonus = values.itemBonus;

  const validate = (value) => {
    if (value > 99999) return "Not allow";
    if (value < 0) return "Not allow";

    return;
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 cursor-pointer select-none min-w-[19%]"
          onClick={onCollapse}
        >
          <span className="text-lg">
            {collapse ? <HiChevronRight /> : <HiChevronDown />}
          </span>
          <h5>Item Bonus</h5>
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
            <FieldArray name="itemBonus">
              {({ form, remove, push }) => (
                <>
                  <div className="o overflow-x-scroll">
                    {itemBonus && itemBonus.length > 0
                      ? itemBonus.map((_, index) => {
                        const groupLevelFeedBack = fieldFeedback(
                          form,
                          `itemBonus[${index}].itemBonus`
                        );
                        const descriptionFeedBack = fieldFeedback(
                          form,
                          `itemBonus[${index}].description`
                        );
                        const quantityFeedBack = fieldFeedback(
                          form,
                          `itemBonus[${index}].quantity`
                        );

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
                                {index + 1}
                              </Button>
                            </FormItem>
                            <FormItem
                              label={index === 0 ? "Item Bonus" : false}
                              invalid={groupLevelFeedBack.invalid}
                              errorMessage={groupLevelFeedBack.errorMessage}
                            >
                              <Field
                                invalid={groupLevelFeedBack.invalid}
                                name={`itemBonus[${index}].itemBonus`}
                                type="text"
                                component={Input}
                              />
                            </FormItem>
                            <FormItem
                              label={index === 0 ? "Description" : false}
                              invalid={descriptionFeedBack.invalid}
                              errorMessage={descriptionFeedBack.errorMessage}
                            // className="w-24 min-w-full "
                            >
                              <Field
                                invalid={descriptionFeedBack.invalid}
                                name={`itemBonus[${index}].description`}
                                type="text"
                                component={Input}
                              />
                            </FormItem>
                            <FormItem
                              label={index === 0 ? "Quantity" : false}
                              invalid={quantityFeedBack.invalid}
                              errorMessage={quantityFeedBack.errorMessage}
                              className="w-24 min-w-full "
                            >
                              <Field
                                invalid={quantityFeedBack.invalid}
                                name={`itemBonus[${index}].quantity`}
                                type="number"
                                component={Input}
                                validate={validate}
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
                      push({ itemBonus: "", description: "", quantity: "" });
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

export default ItemBonus;
