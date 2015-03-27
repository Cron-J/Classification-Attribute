module.exports = {
  Tenant:{
      createTenant: {
        name   	    : "tenant 5",
        status      : "active",
        description : "tenant 5 created",
        validFrom   : "21-12-2009",
        validTo     : "21-12-2009"
      },
      editTenant: {
        name   	    : "tenant 1",
        status      : "active",
        description : "this is updated tenant",
        validFrom   : "21-12-2009",
        validTo     : "21-12-2009"
      },
      tenantId: '542bfe816740fd230e01b935',
      deleteTenant: '54352b088690a1fc06e38971',
      /**helper function*/
      tenantfunc : function(requestData, originalData){
        for(var req in requestData) 
          if(requestData[req] === " ") originalData[req] = " ";
          else originalData[req] = requestData[req];    
      },
      searchObj: {
        name: "t"
      }
  },
  AttributeSection:{
      createAttributeSection: {
       "orderNo":123,
       "descriptions":[{
                      "language":"en","description":"description"
                      }],
        "names":[{
                "language":"en","name":"name"
                }],
        "attributeSectionId":"attribute_section_01"
      },
      editAttributeSection: {
       "orderNo":1234,
       "descriptions":[{
                      "language":"en","description":"description"
                      }],
        "names":[{
                "language":"en","name":"name"
                }]
      },
      attributeSectionId: '548e864a0f8958d81dfd56b1',
      deleteAttributeSection: '548e864a0f8958d81dfd56b1',
      /**helper function*/
      attributeSectionfunc : function(requestData, originalData){
        for(var req in requestData) 
          if(requestData[req] === " ") originalData[req] = " ";
          else originalData[req] = requestData[req];    
      },
      searchObj: {
        attributeSectionId: "a"
      }
  },
  Attribute:{
      createAttribute: {
        "descriptions": {
        "descShort": [
            {
                "language": "en",
                "description": "description"
            }
        ],
        "descLong": [
            {
                "language": "en",
                "description": "description"
            }
        ]
    },
    "types": [
        {
            "id": 1,
            "typeName": "boolean",
            "ticked": true,
            "spc_wylZh": 0,
            "idx_wylZh": 0
        }
    ],
    "orderNo": 123,
    "attributeId": "attribute_02",
    "extAttributeId": "ext_attribute_01",
    "extDefaultName": "ext_name",
    "sectionRef": "547db6d1c365ca2814b43eac",
    "valueOptions": [
        {
            "orderNo": null,
            "surchargeFactor": null,
            "surchargeAmount": null,
            "descriptions": [
                {
                    "language": "en",
                    "description": "blue color"
                }
            ],
            "currency": [],
            "value": "blue",
            "isDefault": false
        }
    ]
      },
      editAttribute: {
       "descriptions": {
        "descShort": [
            {
                "language": "en",
                "description": "description"
            }
        ],
        "descLong": [
            {
                "language": "en",
                "description": "description"
            }
        ]
    },
    "types": [
        {
            "id": 1,
            "typeName": "boolean",
            "ticked": true,
            "spc_wylZh": 0,
            "idx_wylZh": 0
        }
    ],
    "orderNo": 1234,
    "extAttributeId": "ext_attribute_01",
    "extDefaultName": "ext_name",
    "sectionRef": "547db6d1c365ca2814b43eac",
    "valueOptions": [
        {
            "orderNo": null,
            "surchargeFactor": null,
            "surchargeAmount": null,
            "descriptions": [
                {
                    "language": "en",
                    "description": "blue color"
                }
            ],
            "currency": [],
            "value": "blue",
            "isDefault": false
        }
    ]
      },
      attributeId: '548e895dce6c827418a72e25',
      deleteAttribute: '548e895dce6c827418a72e25',
      /**helper function*/
      attributefunc : function(requestData, originalData){
        for(var req in requestData) 
          if(requestData[req] === " ") originalData[req] = " ";
          else originalData[req] = requestData[req];    
      },
      searchObj: {
        attributeId: "a"
      }
  },
  Classification:{
      createClassification: {
        "descriptions": {
            "descShort": [
                {
                    "language": "en",
                    "description": "new_classification"
                }
            ],
            "descLong": [
                {
                    "language": "en",
                    "description": "new_classification"
                }
            ]
        },
        "orderNo": 123,
        "classificationId": "classification_03",
        "tenantRef": "547d6ea3310398ac1152cf91",
        "versionNo": "0.1",
        "type": "UNSPC",
        "documentUrl1": "https://google.com",
        "documentUrl2": "https://google.com",
        "documentUrl3": "https://google.com"
      },
      editClassification: {
        "descriptions": {
            "descShort": [
                {
                    "language": "en",
                    "description": "new_classification"
                }
            ],
            "descLong": [
                {
                    "language": "en",
                    "description": "new_classification"
                }
            ]
        },
        "orderNo": 123,
        "classificationId": "classification_03",
        "tenantRef": "547d6ea3310398ac1152cf91",
        "versionNo": "0.1",
        "type": "UNSPC",
        "documentUrl1": "https://google.com",
        "documentUrl2": "https://google.com",
        "documentUrl3": "https://google.com"
      },
      classificationId: '548e864a0f8958d81dfd56b1',
      deleteClassification: '548e864a0f8958d81dfd56b1',
      /**helper function*/
      classificationfunc : function(requestData, originalData){
        for(var req in requestData) 
          if(requestData[req] === " ") originalData[req] = " ";
          else originalData[req] = requestData[req];    
      },
      searchObj: {
        classificationId: "c"
      }
  },
  ClassificationGroup:{
      createClassificationGroup: { 
        "classificationRef": "548e8ba9cde05d381ea31b47",
        "descriptions": {
            "descShort": [
                {
                    "language": "en",
                    "description": "classification_03 desc"
                }
            ],
            "descLong": [
                {
                    "language": "en",
                    "description": "classification_03 desc"
                }
            ]
        },
        "classificationGroupId": "classification_03",
        "hierarchyCode": "000000",
        "status": "100(new)",
        "orderNo": 123,
        "documentUrl1": "http://google.com",
        "documentUrl2": "http://google.com",
        "classGrp2Attributes": []
      },
      editClassificationGroup: {    
        "classificationRef": "548e8ba9cde05d381ea31b47",
        "descriptions": {
            "descShort": [
                {
                    "language": "en",
                    "description": "classification_03 desc"
                }
            ],
            "descLong": [
                {
                    "language": "en",
                    "description": "classification_03 desc"
                }
            ]
        },
        "classificationGroupId": "classification_03",
        "hierarchyCode": "000000",
        "status": "100(new)",
        "orderNo": 123,
        "documentUrl1": "http://google.com",
        "documentUrl2": "http://google.com",
        "classGrp2Attributes": []
      },
      classificationGroupId: '548e8e18ffe9bcfc15f041b0',
      deleteClassificationGroup: '548e8e18ffe9bcfc15f041b0',
      /**helper function*/
      classificationGroupfunc : function(requestData, originalData){
        for(var req in requestData) 
          if(requestData[req] === " ") originalData[req] = " ";
          else originalData[req] = requestData[req];    
      },
      searchObj: {
        classificationGroupId: "c"
      }
  }
}