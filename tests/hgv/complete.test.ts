import { isValidObject } from "../../schema-validator";
import * as hgvData from "../resources/data/hgvComplete.json";

const schemaName = "v3/tech-record/get/hgv/complete/index.json";

describe("validate complete hgv schema", () => {
  it("should validate when given full data for complete", () => {
    const data = hgvData[0];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should pass and strip if an extra field is given", () => {
    const data = hgvData[1];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
    expect(data).not.toHaveProperty("foo");
  });
  it("should pass validation when given just required fields", () => {
    const data = hgvData[2];
    const res = isValidObject(schemaName, data, true);
    expect(res).toEqual([]);
  });
  it("should fail when missing a required field, systemNumber", () => {
    const data = hgvData[3];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should fail if there is a validator wrong, techRecord_noOfAxles is too high", () => {
    const data = hgvData[4];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });

  describe('adr tests', () => {
    beforeEach(() => { 
      const data = [];
    });

    it('should allow me to submit a body declaration type with EX3', () => {
      const data: any = hgvData[0];
      const modifiedData = { ...data, 
        techRecord_adrDetails_dangerousGoods: true,
        techRecord_adrDetails_permittedDangerousGoods: ['Explosives (type 3)'],
        techRecord_adrDetails_vehicleDetails_type: 'Rigid box body',
        techRecord_adrDetails_vehicleDetails_approvalDate: null,
        techRecord_adrDetails_additionalNotes_number: null,
        techRecord_adrDetails_compatibilityGroupJ: null,
        techRecord_adrDetails_bodyDeclaration_type: 'Unknown'
      }
      const res = isValidObject(schemaName, modifiedData);
      expect(res).toEqual(true);
    });

    it('should allow me to submit without a body declaration type with EX3', () => {
      const data: any = hgvData[0];
      const modifiedData = { ...data, 
        techRecord_adrDetails_dangerousGoods: true,
        techRecord_adrDetails_permittedDangerousGoods: ['Explosives (type 3)'],
        techRecord_adrDetails_vehicleDetails_type: 'Rigid box body',
        techRecord_adrDetails_vehicleDetails_approvalDate: null,
        techRecord_adrDetails_additionalNotes_number: null,
        techRecord_adrDetails_compatibilityGroupJ: null,
      }
      const res = isValidObject(schemaName, modifiedData);
      expect(res).toEqual(true);
    });

    it('should allow me to submit without a body declaration type with EX2', () => {
      const data: any = hgvData[0];
      const modifiedData = { ...data, 
        techRecord_adrDetails_dangerousGoods: true,
        techRecord_adrDetails_permittedDangerousGoods: ['Explosives (type 2)'],
        techRecord_adrDetails_vehicleDetails_type: 'Rigid box body',
        techRecord_adrDetails_vehicleDetails_approvalDate: null,
        techRecord_adrDetails_additionalNotes_number: null,
        techRecord_adrDetails_compatibilityGroupJ: null,
      }
      const res = isValidObject(schemaName, modifiedData);
      expect(res).toEqual(true);
    });

    it('should not allow me to submit with a body declaration type with EX2', () => {
      const data: any = hgvData[0];
      const modifiedData = { ...data, 
        techRecord_adrDetails_dangerousGoods: true,
        techRecord_adrDetails_permittedDangerousGoods: ['Explosives (type 2)'],
        techRecord_adrDetails_vehicleDetails_type: 'Rigid box body',
        techRecord_adrDetails_vehicleDetails_approvalDate: null,
        techRecord_adrDetails_additionalNotes_number: null,
        techRecord_adrDetails_compatibilityGroupJ: null,
        techRecord_adrDetails_bodyDeclaration_type: 'Pre 1st July 2005'
      }
      const res = isValidObject(schemaName, modifiedData);
      expect(res).toEqual(false);
    })

    it('should not allow me to submit with a body declaration type with EX3 but a non enum value', () => {
      const data: any = hgvData[0];
      const modifiedData = { ...data, 
        techRecord_adrDetails_dangerousGoods: true,
        techRecord_adrDetails_permittedDangerousGoods: ['Explosives (type 3)'],
        techRecord_adrDetails_vehicleDetails_type: 'Rigid box body',
        techRecord_adrDetails_vehicleDetails_approvalDate: null,
        techRecord_adrDetails_additionalNotes_number: null,
        techRecord_adrDetails_compatibilityGroupJ: null,
        techRecord_adrDetails_bodyDeclaration_type: 'bad faith value'
      }
      const res = isValidObject(schemaName, modifiedData);
      expect(res).toEqual(false);
    })
  })
});

