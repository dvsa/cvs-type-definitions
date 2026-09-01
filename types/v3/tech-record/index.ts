import { z } from 'zod';
import {
    euVehicleCategoryEnum,
    fitmentCodeEnum,
    fuelPropulsionSystemEnum,
    plateReasonForIssueEnum,
    radioButtonOptionsEnum,
    retarderBrakeEnum,
    statusCodeEnum,
    tc3TypeEnum,
    vehicleConfigurationEnum,
    vehicleSizeEnum,
    vehicleSubclassEnum,
    vehicleTypeEnum,
} from '../../enums';

// ─── Shared sub-schemas ──────────────────────────────────────────────────────

export const bodyTypeSchema = z.object({
    code: z.string(),
    description: z.string(),
});

export const vehicleClassSchema = z.object({
    code: z.string(),
    description: z.string(),
});

export const dimensionsSchema = z.object({
    length: z.number().nullable().optional(),
    width: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    axleSpacing: z.array(z.object({
        axles: z.string(),
        value: z.number().nullable().optional(),
    })).optional(),
});

export const weightsSchema = z.object({
    gbWeight: z.number().nullable().optional(),
    designWeight: z.number().nullable().optional(),
    eecWeight: z.number().nullable().optional(),
    ladenWeight: z.number().nullable().optional(),
    kerbWeight: z.number().nullable().optional(),
});

export const tyresSchema = z.object({
    tyreCode: z.number().nullable().optional(),
    tyreSize: z.string().nullable().optional(),
    plyRating: z.string().nullable().optional(),
    fitmentCode: fitmentCodeEnum.nullable().optional(),
    dataTrAxles: z.number().nullable().optional(),
    speedCategorySymbol: z.string().nullable().optional(),
});

export const axleSchema = z.object({
    axleNumber: z.number().optional(),
    parkingBrakeMrk: z.boolean().optional(),
    weights_gbWeight: z.number().optional(),
    weights_designWeight: z.number().optional(),
    weights_eecWeight: z.number().nullable().optional(),
    weights_ladenWeight: z.number().nullable().optional(),
    weights_kerbWeight: z.number().nullable().optional(),
    tyres_tyreCode: z.number().optional(),
    tyres_tyreSize: z.string().optional(),
    tyres_plyRating: z.string().nullable().optional(),
    tyres_fitmentCode: fitmentCodeEnum.optional(),
    tyres_dataTrAxles: z.number().nullable().optional(),
    tyres_speedCategorySymbol: z.string().nullable().optional(),
    brakes_brakeActuator: z.number().nullable().optional(),
    brakes_leverLength: z.number().nullable().optional(),
    brakes_springBrakeParking: z.boolean().nullable().optional(),
});

export const plateSchema = z.object({
    plateSerialNumber: z.string().nullable().optional(),
    plateIssueDate: z.string().nullable().optional(),
    plateReasonForIssue: plateReasonForIssueEnum.nullable().optional(),
    plateIssuer: z.string().nullable().optional(),
});

export const applicantDetailsSchema = z.object({
    name: z.string().nullable().optional(),
    address1: z.string().nullable().optional(),
    address2: z.string().nullable().optional(),
    address3: z.string().nullable().optional(),
    postTown: z.string().nullable().optional(),
    postCode: z.string().nullable().optional(),
    telephoneNumber: z.string().nullable().optional(),
    emailAddress: z.string().nullable().optional(),
});

export const microfilmSchema = z.object({
    microfilmDocumentType: z.string().nullable().optional(),
    microfilmRollNumber: z.string().nullable().optional(),
    microfilmSerialNumber: z.string().nullable().optional(),
});

// ─── DDA (PSV only) ──────────────────────────────────────────────────────────

export const ddaSchema = z.object({
    certificateIssued: z.boolean().nullable().optional(),
    wheelchairCapacity: z.number().nullable().optional(),
    wheelchairFittings: z.string().nullable().optional(),
    wheelchairLiftPresent: z.boolean().nullable().optional(),
    wheelchairLiftInformation: z.string().nullable().optional(),
    wheelchairRampPresent: z.boolean().nullable().optional(),
    wheelchairRampInformation: z.string().nullable().optional(),
    minEmergencyExits: z.number().nullable().optional(),
    outswing: z.string().nullable().optional(),
    ddaSchedules: z.string().nullable().optional(),
    seatbeltsFitted: z.number().nullable().optional(),
    ddaNotes: z.string().nullable().optional(),
});

// ─── ADR ─────────────────────────────────────────────────────────────────────

export const adrTc3DetailSchema = z.object({
    tc3Type: tc3TypeEnum.nullable().optional(),
    tc3PeriodicNumber: z.string().nullable().optional(),
    tc3PeriodicExpiryDate: z.string().nullable().optional(),
});

export const adrPassCertificateSchema = z.object({
    createdByName: z.string(),
    certificateType: z.string(),
    generatedTimestamp: z.string(),
    certificateId: z.string(),
});

export const adrExaminerNoteSchema = z.object({
    note: z.string().nullable().optional(),
    createdAtDate: z.string().nullable().optional(),
    lastUpdatedBy: z.string().nullable().optional(),
});

export const adrDetailsSchema = z.object({
    documentId: z.string().optional(),
    dangerousGoods: z.boolean().nullable().optional(),
    vehicleDetails_type: z.string().nullable().optional(),
    vehicleDetails_usedOnInternationalJourneys: radioButtonOptionsEnum.nullable().optional(),
    vehicleDetails_approvalDate: z.string().nullable().optional(),
    permittedDangerousGoods: z.array(z.string()).nullable().optional(),
    compatibilityGroupJ: z.string().nullable().optional(),
    bodyDeclaration_type: z.string().nullable().optional(),
    applicantDetails_name: z.string().nullable().optional(),
    applicantDetails_street: z.string().nullable().optional(),
    applicantDetails_town: z.string().nullable().optional(),
    applicantDetails_city: z.string().nullable().optional(),
    applicantDetails_postcode: z.string().nullable().optional(),
    memosApply: z.array(z.string()).nullable().optional(),
    documents: z.array(z.string()).nullable().optional(),
    listStatementApplicable: z.boolean().nullable().optional(),
    batteryListNumber: z.string().nullable().optional(),
    brakeDeclarationIssuer: z.string().nullable().optional(),
    brakeDeclarationsSeen: z.boolean().nullable().optional(),
    brakeEndurance: z.boolean().nullable().optional(),
    weight: z.number().nullable().optional(),
    declarationsSeen: z.boolean().nullable().optional(),
    m145Statement: z.boolean().nullable().optional(),
    newCertificateRequested: z.boolean().nullable().optional(),
    additionalNotes_number: z.array(z.string()).nullable().optional(),
    adrTypeApprovalNo: z.string().nullable().optional(),
    adrCertificateNotes: z.string().nullable().optional(),
    tank_tankDetails_tankManufacturer: z.string().nullable().optional(),
    tank_tankDetails_yearOfManufacture: z.number().nullable().optional(),
    tank_tankDetails_tankManufacturerSerialNo: z.string().nullable().optional(),
    tank_tankDetails_tankTypeAppNo: z.string().nullable().optional(),
    tank_tankDetails_tankCode: z.string().nullable().optional(),
    tank_tankDetails_specialProvisions: z.string().nullable().optional(),
    tank_tankDetails_tc2Details_tc2Type: z.string().nullable().optional(),
    tank_tankDetails_tc2Details_tc2IntermediateApprovalNo: z.string().nullable().optional(),
    tank_tankDetails_tc2Details_tc2IntermediateExpiryDate: z.string().nullable().optional(),
    tank_tankDetails_tc3Details: z.array(adrTc3DetailSchema).nullable().optional(),
    tank_tankDetails_tankStatement_substancesPermitted: z.string().nullable().optional(),
    tank_tankDetails_tankStatement_select: z.string().nullable().optional(),
    tank_tankDetails_tankStatement_statement: z.string().nullable().optional(),
    tank_tankDetails_tankStatement_productListRefNo: z.string().nullable().optional(),
    tank_tankDetails_tankStatement_productListUnNo: z.array(z.string()).nullable().optional(),
    tank_tankDetails_tankStatement_productList: z.string().nullable().optional(),
    additionalExaminerNotes: z.array(adrExaminerNoteSchema).nullable().optional(),
});

// ─── Purchaser / Manufacturer details (TRL) ──────────────────────────────────

export const contactDetailsSchema = z.object({
    name: z.string().nullable().optional(),
    address1: z.string().nullable().optional(),
    address2: z.string().nullable().optional(),
    address3: z.string().nullable().optional(),
    postTown: z.string().nullable().optional(),
    postCode: z.string().nullable().optional(),
    telephoneNumber: z.string().nullable().optional(),
    emailAddress: z.string().nullable().optional(),
    faxNumber: z.string().nullable().optional(),
});

export const purchaserDetailsSchema = contactDetailsSchema.extend({
    purchaserNotes: z.string().nullable().optional(),
});

export const manufacturerDetailsSchema = contactDetailsSchema.extend({
    manufacturerNotes: z.string().nullable().optional(),
});

// ─── Auth Into Service (TRL) ─────────────────────────────────────────────────

export const authIntoServiceSchema = z.object({
    cocIssueDate: z.string().nullable().optional(),
    dateReceived: z.string().nullable().optional(),
    datePending: z.string().nullable().optional(),
    dateAuthorised: z.string().nullable().optional(),
    dateRejected: z.string().nullable().optional(),
});

// ─── Letter of Auth (TRL) ────────────────────────────────────────────────────

export const letterOfAuthSchema = z.object({
    letterType: z.string().nullable().optional(),
    letterDateRequested: z.string().nullable().optional(),
    paragraphId: z.string().nullable().optional(),
    letterIssuer: z.string().nullable().optional(),
});

// ─── V3 Tech Record (flat field API format) ──────────────────────────────────
// This is the shape used by GET/PUT /tech-records endpoints.
// All vehicle-type-specific fields are present but nullable.

export const techRecordV3Schema = z.object({
    systemNumber: z.string(),
    vin: z.string(),
    primaryVrm: z.string().optional(),
    secondaryVrms: z.array(z.string()).nullable().optional(),
    trailerId: z.string().optional(),
    createdTimestamp: z.string().optional(),
    partialVin: z.string().nullable().optional(),

    techRecord_vehicleType: vehicleTypeEnum,
    techRecord_statusCode: statusCodeEnum,
    techRecord_reasonForCreation: z.string(),
    techRecord_recordCompleteness: z.string().nullable().optional(),
    techRecord_hiddenInVta: z.boolean().nullable().optional(),
    techRecord_updateType: z.string().nullable().optional(),
    techRecord_applicationId: z.string().nullable().optional(),

    techRecord_noOfAxles: z.number().nullable().optional(),
    techRecord_vehicleConfiguration: vehicleConfigurationEnum.nullable().optional(),
    techRecord_euVehicleCategory: euVehicleCategoryEnum.nullable().optional(),
    techRecord_vehicleClass_code: z.string().optional(),
    techRecord_vehicleClass_description: z.string().optional(),
    techRecord_make: z.string().optional(),
    techRecord_model: z.string().optional(),
    techRecord_bodyType_code: z.string().nullable().optional(),
    techRecord_bodyType_description: z.string().nullable().optional(),
    techRecord_regnDate: z.string().nullable().optional(),
    techRecord_manufactureYear: z.number().nullable().optional(),
    techRecord_firstUseDate: z.string().nullable().optional(),
    techRecord_notes: z.string().nullable().optional(),
    techRecord_numberOfWheelsDriven: z.number().nullable().optional(),
    techRecord_offRoad: z.boolean().nullable().optional(),
    techRecord_vehicleSubclass: z.array(vehicleSubclassEnum).nullable().optional(),
    techRecord_vehicleSize: vehicleSizeEnum.nullable().optional(),

    techRecord_grossGbWeight: z.number().nullable().optional(),
    techRecord_grossDesignWeight: z.number().nullable().optional(),
    techRecord_grossEecWeight: z.number().nullable().optional(),
    techRecord_grossKerbWeight: z.number().nullable().optional(),
    techRecord_grossLadenWeight: z.number().nullable().optional(),
    techRecord_unladenWeight: z.number().nullable().optional(),
    techRecord_trainGbWeight: z.number().nullable().optional(),
    techRecord_trainDesignWeight: z.number().nullable().optional(),
    techRecord_trainEecWeight: z.number().nullable().optional(),
    techRecord_maxTrainGbWeight: z.number().nullable().optional(),
    techRecord_maxTrainDesignWeight: z.number().nullable().optional(),
    techRecord_maxTrainEecWeight: z.number().nullable().optional(),

    techRecord_dimensions_length: z.number().nullable().optional(),
    techRecord_dimensions_width: z.number().nullable().optional(),
    techRecord_dimensions_height: z.number().nullable().optional(),
    techRecord_frontAxleToRearAxle: z.number().nullable().optional(),
    techRecord_dimensions_axleSpacing: z.array(z.object({
        axles: z.string(),
        value: z.number().nullable().optional(),
    })).optional(),

    techRecord_brakes_dtpNumber: z.string().nullable().optional(),
    techRecord_brakes_loadSensingValve: z.boolean().nullable().optional(),
    techRecord_brakes_antilockBrakingSystem: z.boolean().nullable().optional(),
    techRecord_brakes_brakeCode: z.string().nullable().optional(),
    techRecord_brakes_brakeCodeOriginal: z.string().nullable().optional(),
    techRecord_brakes_dataTrBrakeOne: z.string().nullable().optional(),
    techRecord_brakes_dataTrBrakeTwo: z.string().nullable().optional(),
    techRecord_brakes_dataTrBrakeThree: z.string().nullable().optional(),
    techRecord_brakes_retarderBrakeOne: retarderBrakeEnum.nullable().optional(),
    techRecord_brakes_retarderBrakeTwo: retarderBrakeEnum.nullable().optional(),
    techRecord_brakes_brakeForceWheelsNotLocked_parkingBrakeForceA: z.number().nullable().optional(),
    techRecord_brakes_brakeForceWheelsNotLocked_secondaryBrakeForceA: z.number().nullable().optional(),
    techRecord_brakes_brakeForceWheelsNotLocked_serviceBrakeForceA: z.number().nullable().optional(),
    techRecord_brakes_brakeForceWheelsUpToHalfLocked_parkingBrakeForceB: z.number().nullable().optional(),
    techRecord_brakes_brakeForceWheelsUpToHalfLocked_secondaryBrakeForceB: z.number().nullable().optional(),
    techRecord_brakes_brakeForceWheelsUpToHalfLocked_serviceBrakeForceB: z.number().nullable().optional(),

    techRecord_speedLimiterMrk: z.boolean().nullable().optional(),
    techRecord_tachoExemptMrk: z.boolean().nullable().optional(),
    techRecord_euroStandard: z.string().nullable().optional(),
    techRecord_fuelPropulsionSystem: fuelPropulsionSystemEnum.nullable().optional(),
    techRecord_emissionsLimit: z.number().nullable().optional(),
    techRecord_roadFriendly: z.boolean().nullable().optional(),
    techRecord_drawbarCouplingFitted: z.boolean().nullable().optional(),
    techRecord_tyreUseCode: z.string().nullable().optional(),
    techRecord_frontAxleTo5thWheelMin: z.number().nullable().optional(),
    techRecord_frontAxleTo5thWheelMax: z.number().nullable().optional(),
    techRecord_frontVehicleTo5thWheelCouplingMin: z.number().nullable().optional(),
    techRecord_frontVehicleTo5thWheelCouplingMax: z.number().nullable().optional(),

    techRecord_seatsLowerDeck: z.number().nullable().optional(),
    techRecord_seatsUpperDeck: z.number().nullable().optional(),
    techRecord_standingCapacity: z.number().nullable().optional(),
    techRecord_numberOfSeatbelts: z.string().nullable().optional(),
    techRecord_seatbeltInstallationApprovalDate: z.string().nullable().optional(),
    techRecord_bodyMake: z.string().nullable().optional(),
    techRecord_bodyModel: z.string().nullable().optional(),
    techRecord_chassisMake: z.string().nullable().optional(),
    techRecord_chassisModel: z.string().nullable().optional(),
    techRecord_modelLiteral: z.string().nullable().optional(),
    techRecord_speedRestriction: z.number().nullable().optional(),
    techRecord_coifSerialNumber: z.string().nullable().optional(),
    techRecord_coifCertifierName: z.string().nullable().optional(),
    techRecord_coifDate: z.string().nullable().optional(),
    techRecord_dispensations: z.string().nullable().optional(),
    techRecord_remarks: z.string().nullable().optional(),

    techRecord_couplingType: z.string().nullable().optional(),
    techRecord_maxLoadOnCoupling: z.number().nullable().optional(),
    techRecord_suspensionType: z.string().nullable().optional(),
    techRecord_rearAxleToRearTrl: z.number().nullable().optional(),
    techRecord_couplingCenterToRearAxleMin: z.number().nullable().optional(),
    techRecord_couplingCenterToRearAxleMax: z.number().nullable().optional(),
    techRecord_couplingCenterToRearTrlMin: z.number().nullable().optional(),
    techRecord_couplingCenterToRearTrlMax: z.number().nullable().optional(),
    techRecord_centreOfRearmostAxleToRearOfTrl: z.number().nullable().optional(),
    techRecord_frameDescription: z.string().nullable().optional(),

    techRecord_approvalType: z.string().nullable().optional(),
    techRecord_approvalTypeNumber: z.string().nullable().optional(),
    techRecord_ntaNumber: z.string().nullable().optional(),
    techRecord_variantNumber: z.string().nullable().optional(),
    techRecord_variantVersionNumber: z.string().nullable().optional(),
    techRecord_functionCode: z.string().nullable().optional(),
    techRecord_conversionRefNo: z.string().nullable().optional(),
    techRecord_alterationMarker: z.boolean().nullable().optional(),
    techRecord_departmentalVehicleMarker: z.boolean().nullable().optional(),

    techRecord_microfilm_microfilmDocumentType: z.string().nullable().optional(),
    techRecord_microfilm_microfilmRollNumber: z.string().nullable().optional(),
    techRecord_microfilm_microfilmSerialNumber: z.string().nullable().optional(),

    techRecord_applicantDetails_name: z.string().nullable().optional(),
    techRecord_applicantDetails_address1: z.string().nullable().optional(),
    techRecord_applicantDetails_address2: z.string().nullable().optional(),
    techRecord_applicantDetails_address3: z.string().nullable().optional(),
    techRecord_applicantDetails_postTown: z.string().nullable().optional(),
    techRecord_applicantDetails_postCode: z.string().nullable().optional(),
    techRecord_applicantDetails_telephoneNumber: z.string().nullable().optional(),
    techRecord_applicantDetails_emailAddress: z.string().nullable().optional(),

    techRecord_purchaserDetails_name: z.string().nullable().optional(),
    techRecord_purchaserDetails_address1: z.string().nullable().optional(),
    techRecord_purchaserDetails_address2: z.string().nullable().optional(),
    techRecord_purchaserDetails_address3: z.string().nullable().optional(),
    techRecord_purchaserDetails_postTown: z.string().nullable().optional(),
    techRecord_purchaserDetails_postCode: z.string().nullable().optional(),
    techRecord_purchaserDetails_telephoneNumber: z.string().nullable().optional(),
    techRecord_purchaserDetails_emailAddress: z.string().nullable().optional(),
    techRecord_purchaserDetails_faxNumber: z.string().nullable().optional(),
    techRecord_purchaserDetails_purchaserNotes: z.string().nullable().optional(),

    techRecord_manufacturerDetails_name: z.string().nullable().optional(),
    techRecord_manufacturerDetails_address1: z.string().nullable().optional(),
    techRecord_manufacturerDetails_address2: z.string().nullable().optional(),
    techRecord_manufacturerDetails_address3: z.string().nullable().optional(),
    techRecord_manufacturerDetails_postTown: z.string().nullable().optional(),
    techRecord_manufacturerDetails_postCode: z.string().nullable().optional(),
    techRecord_manufacturerDetails_telephoneNumber: z.string().nullable().optional(),
    techRecord_manufacturerDetails_emailAddress: z.string().nullable().optional(),
    techRecord_manufacturerDetails_faxNumber: z.string().nullable().optional(),
    techRecord_manufacturerDetails_manufacturerNotes: z.string().nullable().optional(),

    techRecord_letterOfAuth_letterType: z.string().nullable().optional(),
    techRecord_letterOfAuth_letterDateRequested: z.string().nullable().optional(),
    techRecord_letterOfAuth_paragraphId: z.string().nullable().optional(),
    techRecord_letterOfAuth_letterIssuer: z.string().nullable().optional(),

    techRecord_authIntoService_cocIssueDate: z.string().nullable().optional(),
    techRecord_authIntoService_dateReceived: z.string().nullable().optional(),
    techRecord_authIntoService_datePending: z.string().nullable().optional(),
    techRecord_authIntoService_dateAuthorised: z.string().nullable().optional(),
    techRecord_authIntoService_dateRejected: z.string().nullable().optional(),

    techRecord_axles: z.array(axleSchema).optional(),
    techRecord_plates: z.array(plateSchema).nullable().optional(),
    techRecord_adrDetails: adrDetailsSchema.nullable().optional(),
    techRecord_adrPassCertificateDetails: z.array(adrPassCertificateSchema).nullable().optional(),
    techRecord_dda_certificateIssued: z.boolean().nullable().optional(),
    techRecord_dda_wheelchairCapacity: z.number().nullable().optional(),
    techRecord_dda_wheelchairFittings: z.string().nullable().optional(),
    techRecord_dda_wheelchairLiftPresent: z.boolean().nullable().optional(),
    techRecord_dda_wheelchairLiftInformation: z.string().nullable().optional(),
    techRecord_dda_wheelchairRampPresent: z.boolean().nullable().optional(),
    techRecord_dda_wheelchairRampInformation: z.string().nullable().optional(),
    techRecord_dda_minEmergencyExits: z.number().nullable().optional(),
    techRecord_dda_outswing: z.string().nullable().optional(),
    techRecord_dda_ddaSchedules: z.string().nullable().optional(),
    techRecord_dda_seatbeltsFitted: z.number().nullable().optional(),
    techRecord_dda_ddaNotes: z.string().nullable().optional(),

    techRecord_createdAt: z.string().nullable().optional(),
    techRecord_createdById: z.string().nullable().optional(),
    techRecord_createdByName: z.string().nullable().optional(),
    techRecord_lastUpdatedAt: z.string().nullable().optional(),
    techRecord_lastUpdatedById: z.string().nullable().optional(),
    techRecord_lastUpdatedByName: z.string().nullable().optional(),
});

export type TechRecordV3 = z.infer<typeof techRecordV3Schema>;

// ─── V1 Tech Record (nested format, legacy) ─────────────────────────────────

export const techRecordV1Schema = z.object({
    bodyType: bodyTypeSchema.optional(),
    manufactureYear: z.number().optional(),
    regnDate: z.string().optional(),
    ntaNumber: z.string().optional(),
    conversionRefNo: z.string().optional(),
    speedLimiterMrk: z.boolean().optional(),
    tachoExemptMrk: z.boolean().optional(),
    reasonForCreation: z.string(),
    statusCode: statusCodeEnum,
    grossKerbWeight: z.number().optional(),
    grossLadenWeight: z.number().optional(),
    noOfAxles: z.number().optional(),
    vehicleType: vehicleTypeEnum,
    vehicleConfiguration: vehicleConfigurationEnum.optional(),
    vehicleClass: vehicleClassSchema.optional(),
    euVehicleCategory: euVehicleCategoryEnum.optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    notes: z.string().optional(),
    axles: z.array(axleSchema).optional(),
    plates: z.array(plateSchema).optional(),
    dimensions: dimensionsSchema.optional(),
    applicantDetails: applicantDetailsSchema.optional(),
    microfilm: microfilmSchema.optional(),
    dda: ddaSchema.optional(),
    adrDetails: adrDetailsSchema.optional(),
    adrPassCertificateDetails: z.array(adrPassCertificateSchema).optional(),
}).loose();

export type TechRecordV1 = z.infer<typeof techRecordV1Schema>;

// ─── Type exports ────────────────────────────────────────────────────────────

export type BodyType = z.infer<typeof bodyTypeSchema>;
export type VehicleClass = z.infer<typeof vehicleClassSchema>;
export type Dimensions = z.infer<typeof dimensionsSchema>;
export type Weights = z.infer<typeof weightsSchema>;
export type Tyres = z.infer<typeof tyresSchema>;
export type Axle = z.infer<typeof axleSchema>;
export type Plate = z.infer<typeof plateSchema>;
export type ApplicantDetails = z.infer<typeof applicantDetailsSchema>;
export type Microfilm = z.infer<typeof microfilmSchema>;
export type DDA = z.infer<typeof ddaSchema>;
export type AdrDetails = z.infer<typeof adrDetailsSchema>;
export type AdrTc3Detail = z.infer<typeof adrTc3DetailSchema>;
export type AdrPassCertificate = z.infer<typeof adrPassCertificateSchema>;
export type AdrExaminerNote = z.infer<typeof adrExaminerNoteSchema>;
export type PurchaserDetails = z.infer<typeof purchaserDetailsSchema>;
export type ManufacturerDetails = z.infer<typeof manufacturerDetailsSchema>;
export type AuthIntoService = z.infer<typeof authIntoServiceSchema>;
export type LetterOfAuth = z.infer<typeof letterOfAuthSchema>;
