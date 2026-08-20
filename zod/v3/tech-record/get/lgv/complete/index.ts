// AUTO-GENERATED from json-definitions/v3/tech-record/get/lgv/complete/index.json. Do not edit by hand.

import { z } from "zod";

import { ADRBodyDeclarationTypesSchema } from "./../../../enums/adrBodyDeclarationType.enum";
import { RadioButtonOptionsSchema } from "./../../../enums/radioButtonOptions.enum";
import { ADRCompatibilityGroupJSchema } from "./../../../enums/adrCompatibilityGroupJ.enum";
import { TC2TypesSchema } from "./../../../enums/tc2Types.ignore";
import { TC3TypesSchema } from "./../../../enums/tc3Types.enum";
import { ADRTankDetailsTankStatementSelectSchema } from "./../../../enums/adrTankDetailsTankStatementSelect.enum";
import { ADRCertificateTypesSchema } from "./../../../enums/adrCertificateTypes.enum";
import { EUvehiclecategorySchema } from "./../../../enums/euVehicleCategoryLgv.enum";
import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";
import { VehicleSubclassSchema } from "./../../../enums/vehicleSubclass.ignore";

export const TechRecordGETLGVCompleteSchema = z.object({
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
  "techRecord_adrDetails_documentId": z.string().optional(),
  "techRecord_adrDetails_dangerousGoods": z.boolean().nullable().optional(),
  "techRecord_adrDetails_vehicleDetails_type": z.string().nullable().optional(),
  "techRecord_adrDetails_bodyDeclaration_type": z.union([z.null(), ADRBodyDeclarationTypesSchema]).optional(),
  "techRecord_adrDetails_vehicleDetails_usedOnInternationalJourneys": z.union([z.null(), RadioButtonOptionsSchema]).optional(),
  "techRecord_adrDetails_vehicleDetails_approvalDate": z.union([z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")), z.null()]).optional(),
  "techRecord_adrDetails_permittedDangerousGoods": z.array(z.string()).nullable().optional(),
  "techRecord_adrDetails_compatibilityGroupJ": z.union([z.null(), ADRCompatibilityGroupJSchema]).optional(),
  "techRecord_adrDetails_additionalExaminerNotes": z.array(z.object({
  "note": z.string().nullable().optional(),
  "createdAtDate": z.string().nullable().optional(),
  "lastUpdatedBy": z.string().nullable().optional(),
}).strict()).nullable().optional(),
  "techRecord_adrDetails_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_adrDetails_applicantDetails_street": z.string().nullable().optional(),
  "techRecord_adrDetails_applicantDetails_town": z.string().nullable().optional(),
  "techRecord_adrDetails_applicantDetails_city": z.string().nullable().optional(),
  "techRecord_adrDetails_applicantDetails_postcode": z.string().nullable().optional(),
  "techRecord_adrDetails_memosApply": z.array(z.string()).nullable().optional(),
  "techRecord_adrDetails_documents": z.array(z.string()).nullable().optional(),
  "techRecord_adrDetails_listStatementApplicable": z.boolean().nullable().optional(),
  "techRecord_adrDetails_batteryListNumber": z.string().nullable().optional(),
  "techRecord_adrDetails_brakeDeclarationsSeen": z.boolean().nullable().optional(),
  "techRecord_adrDetails_brakeDeclarationIssuer": z.string().nullable().optional(),
  "techRecord_adrDetails_brakeEndurance": z.boolean().nullable().optional(),
  "techRecord_adrDetails_weight": z.number().nullable().optional(),
  "techRecord_adrDetails_declarationsSeen": z.boolean().nullable().optional(),
  "techRecord_adrDetails_m145Statement": z.boolean().nullable().optional(),
  "techRecord_adrDetails_newCertificateRequested": z.boolean().nullable().optional(),
  "techRecord_adrDetails_additionalNotes_number": z.array(z.string()).nullable().optional(),
  "techRecord_adrDetails_adrTypeApprovalNo": z.string().nullable().optional(),
  "techRecord_adrDetails_adrCertificateNotes": z.string().nullable().optional(),
  "techRecord_adrDetails_approved": z.boolean().nullable().optional(),
  "techRecord_adrDetails_receivedDate": z.union([z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")), z.null()]).optional(),
  "techRecord_adrDetails_applicationNumber": z.union([z.string().regex(new RegExp("^APP-\\d{7}-\\d{4}-\\d{1,2}$")), z.null()]).optional(),
  "techRecord_adrDetails_tank_tankDetails_tankManufacturer": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_yearOfManufacture": z.number().int().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankManufacturerSerialNo": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankTypeAppNo": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankCode": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_specialProvisions": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tc2Details_tc2Type": z.union([z.null(), TC2TypesSchema]).optional(),
  "techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateApprovalNo": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateExpiryDate": z.union([z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")), z.null()]).optional(),
  "techRecord_adrDetails_tank_tankDetails_tc3Details": z.array(z.object({
  "tc3Type": z.union([z.null(), TC3TypesSchema]).optional(),
  "tc3PeriodicNumber": z.string().nullable().optional(),
  "tc3PeriodicExpiryDate": z.union([z.string().regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$")), z.null()]).optional(),
}).strict()).nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankStatement_substancesPermitted": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankStatement_select": z.union([z.null(), ADRTankDetailsTankStatementSelectSchema]).optional(),
  "techRecord_adrDetails_tank_tankDetails_tankStatement_statement": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankStatement_productListRefNo": z.string().nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo": z.array(z.string()).nullable().optional(),
  "techRecord_adrDetails_tank_tankDetails_tankStatement_productList": z.string().nullable().optional(),
  "techRecord_adrPassCertificateDetails": z.array(z.object({
  "createdByName": z.string(),
  "certificateType": ADRCertificateTypesSchema,
  "generatedTimestamp": z.string(),
  "certificateId": z.string(),
}).strict()).nullable().optional(),
  "createdTimestamp": z.string(),
  "partialVin": z.string().nullable().optional(),
  "primaryVrm": z.string().nullable().optional(),
  "systemNumber": z.string(),
  "techRecord_createdAt": z.string(),
  "techRecord_createdById": z.string(),
  "techRecord_createdByName": z.string(),
  "techRecord_euVehicleCategory": z.union([z.null(), EUvehiclecategorySchema]).optional(),
  "techRecord_lastUpdatedAt": z.string().nullable().optional(),
  "techRecord_lastUpdatedById": z.string().nullable().optional(),
  "techRecord_lastUpdatedByName": z.string().nullable().optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_recordCompleteness": z.string().nullable().optional(),
  "techRecord_noOfAxles": z.number().int(),
  "techRecord_notes": z.string().nullable().optional(),
  "techRecord_reasonForCreation": z.string(),
  "techRecord_regnDate": z.string().nullable().optional(),
  "techRecord_statusCode": z.union([z.null(), StatusCodeSchema]).optional(),
  "techRecord_vehicleConfiguration": VehicleConfigurationSchema,
  "techRecord_vehicleType": z.literal("lgv"),
  "vin": z.string(),
  "techRecord_vehicleSubclass": VehicleSubclassSchema,
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
  "techRecord_updateType": z.string().nullable().optional(),
  "secondaryVrms": z.array(z.string()).nullable().optional(),
}).strict();

export type TechRecordGETLGVComplete = z.infer<typeof TechRecordGETLGVCompleteSchema>;
