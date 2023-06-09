import {isValidObject} from "./schema-validation/schema-validator";

isValidObject("v3", "get", "car", "complete",
    {
        "techRecord_manufactureYear": null,
        "primaryVrm": "991234Z",
        "techRecord_make": "HONDA",
        "vin": "AA11100851",
        "techRecord_statusCode": "current",
        "techRecord_vehicleType": "car",
        "createdTimestamp": "2023-02-07T10:39:47.000000Z",
        "systemNumber": "5976221"
    }
)
