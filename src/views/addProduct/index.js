import React, { useState } from "react";
import { Button, FormContainer } from "components/ui";
import { Formik, Form } from "formik";
import { StickyFooter, ConfirmDialog } from "components/shared";
import Product from "./components/product";
import { AiOutlineSave } from "react-icons/ai";
import CustomerLevel from "./components/customerLevel";
import DetailProgram from "./components/detail";
import ItemBonus from "./components/itemBonus";
import * as Yup from "yup";
import _ from "lodash";

// ====== minimum data ======
// Yup.addMethod(Yup.array, 'unique', function (message, mapper = a => a) {
//   return this.test('unique', message, function (list) {
//     return list.length === new Set(list.map(mapper)).size;
//   });
// });

// ====== Unique Property ======
Yup.addMethod(Yup.array, "uniqueProperty", function (propertyPath, message) {
  return this.test("unique", "", function (list) {
    const errors = [];

    list.forEach((item, index) => {
      const propertyValue = _.get(item, propertyPath);

      if (
        propertyValue &&
        _.filter(list, [propertyPath, propertyValue]).length > 1
      ) {
        errors.push(
          this.createError({
            path: `${this.path}[${index}].${propertyPath}`,
            message,
          })
        );
      }
    });

    if (!_.isEmpty(errors)) {
      throw new Yup.ValidationError(errors);
    }

    return true;
  });
});

const validationSchema = Yup.object({
  // customerLevel: Yup.string().required("Customer Level required"),
  // customerLevelChild: Yup.array().of(
  //   Yup.object().shape({
  //     // csLevelChild: Yup.string().required("Customer Level required"),
  //     groupLevel: Yup.string().required("Group level required"),
  //     description: Yup.string().required("Description required"),
  //   })
  // ),
  // detail: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       levelItem: Yup.string().required("Required"),
  //       principalCode: Yup.string().required("Required"),
  //       itemGroup: Yup.string().when("levelItem", {
  //         is: (value) => /^(LINI_DESC|SUBLINI_DEC)$/.test(value),
  //         then: Yup.string().required("Required"),
  //         otherwise: Yup.string(),
  //       }),
  //       itemCode: Yup.string().when("levelItem", {
  //         is: (value) => /^(ITEM_CODE)$/.test(value),
  //         then: Yup.string().required("Required"),
  //         otherwise: Yup.string(),
  //       }),
  //       qtyFrom: Yup.string().required("Required"),
  //       qtyTo: Yup.string().required("Required"),
  //       discount: Yup.string().required("Required"),
  //     })
  //   )
  //   .uniqueProperty("itemGroup", "must be unique")
  //   .uniqueProperty("itemCode", "must be unique"),
  // approvalCode: Yup.string().required("Approval Code required"),
  // orderType: Yup.string().required("Order Type required"),
  // programType: Yup.string().required("program Type required"),
  // description: Yup.string().required("Description required"),
  // remark: Yup.string().required("Remark required"),
  // paket: Yup.string().required("Paket required"),
  // diskonType: Yup.string().required("Dickon Type required"),
  // startDate: Yup.date().required("Start Date required").nullable(),
  // endDate: Yup.date().required("End Date required").nullable(),
  // minValue: Yup.number().required("Min Value required").nullable(),
  // maxValue: Yup.number().required("Max Value required").nullable(),
  // minQuantity: Yup.number().required("Min Quantity required"),
  // maxQuantity: Yup.number().required("Max Quantity required"),
  // itemBonus: Yup.array().when("programType", {
  //   is: (value) => /^(BONUS)$/.test(value),
  //   then: Yup.array()
  //     .of(
  //       Yup.object().shape({
  //         itemBonus: Yup.string().required("Item Bonus required"),
  //         description: Yup.string().required("Description required"),
  //         quantity: Yup.string().required("required"),
  //       })
  //     )
  //     // .unique('duplicate itemBonus', a => a.itemBonus).required("Must have friends")
  //     .uniqueProperty("itemBonus", "Item must be unique"),
  //   otherwise: Yup.array(),
  // }),
});

const CreateProgram = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    console.log("data : ", data);
  };
  return (
    <div>
      <Formik
        initialValues={{
          customerLevelChild: [
            {
              csLevelChild: "",
              groupLevel: "",
              description: "",
            },
          ],
          detail: [
            {
              levelItem: "",
              principalCode: "",
              itemGroup: "",
              itemCode: "",
              qtyFrom: "",
              qtyTo: "",
              discount: "",
            },
          ],
          itemBonus: [
            {
              itemBonus: "",
              description: "",
              quantity: "",
            },
          ],
          status: ["Active"],
          customerLevel: "",
          paket: "",
          startDate: "",
          endDate: "",
          minValue: "",
          maxValue: "",
          minQuantity: "",
          maxQuantity: "",
          diskonType: "",
          approvalCode: "",
          orderType: "",
          programType: "",
          description: "",
          remark: "",
          noProgram: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setOpen(true);
          setData(values);
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => {
          return (
            <Form>
              <FormContainer>
                <Product touched={touched} errors={errors} values={values} />
                <CustomerLevel
                  touched={touched}
                  errors={errors}
                  values={values}
                />
                <DetailProgram
                  touched={touched}
                  errors={errors}
                  values={values}
                />
                {values.programType === "BONUS" ? (
                  <ItemBonus
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                ) : (
                  ""
                )}
                <StickyFooter
                  className="-mx-8 px-8 flex items-center justify-end py-4"
                  stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="md:flex items-center">
                    <Button
                      size="sm"
                      className="ltr:mr-3 rtl:ml-3"
                      onClick={async () => resetForm()}
                      type="button"
                    >
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      loading={isSubmitting}
                      icon={<AiOutlineSave />}
                      type="submit"
                    >
                      Apply
                    </Button>
                  </div>
                </StickyFooter>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
      <ConfirmDialog
        isOpen={open}
        onClose={handleClose}
        onRequestClose={handleClose}
        type="warning"
        title="Apply Program"
        onCancel={handleClose}
        onConfirm={handleConfirm}
        // confirmButtonColor={dialogType[selected].confirmButtonColor}
      >
        <p>Pastikan program sudah sesuai.</p>
        <p>{JSON.stringify(data, null, 2)}</p>
      </ConfirmDialog>
    </div>
  );
};

export default CreateProgram;
