define({ "api": [
  {
    "type": "post",
    "url": "/chpass",
    "title": "03) Change password",
    "group": "Authentication",
    "name": "changePassword",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "02) Login user",
    "group": "Authentication",
    "name": "userLogin",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>valid email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt valid for 8 hours and must be placed at &quot;Authorization&quot; header</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "response example:",
          "content": "{\n    \"token\": \"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2NGZkODNkLWQ2NTItNDI5YS04OWM4LTJjNjJhOWY2ZTRjOSIsImlhdCI6MTUyNzE4NzA5MywiZXhwIjoxNTI3MjE1ODkzfQ.cGRV9PGLdfXgMfTlFjbeOhaPiC_n7F1Xn_2bcy2T7MpctQcNkCf8w2jBbgWMRoCQU1xj_SR4r68hvXUPGy-nqETEEPg4_yJnyxAaoLejSjhxokMtwM0yWWu-8bgR9J4J4MVxCmduX8gGW06UgRv7g7avXqWJBHV5HeOvmuVqps60-Kt5kxiZ2w93bRkpG3edp-1xH3alJokKLSnxBGcrM3ZzbnZbhoAMtKktvnfVLv-I14SbKSgrhPWMAWgRl3fHVuq3FphglwlqUu7WAYHTmGkHV6aa8z_aalZpcynr_-2PiESk2C0Ketij70A4-xJ23mQAMwMytoCpey3Lp9zBgg\",\n    \"user\": {\n        \"id\": \"564fd83d-d652-429a-89c8-2c62a9f6e4c9\",\n        \"name\": \"user1\",\n        \"email\": \"user@a.aa\",\n        \"birthdate\": \"2018-07-23T05:15:27.000Z\",\n        \"photo\": \"564fd83d-d652-429a-99f0-b7b39197091f.png\",\n        \"country_code\": \"PT\",\n        \"city\": \"Leiria\",\n        \"description\": \"Some description about me\"\n        \"skills\": [\n            {\n                \"id\": \"69d4b004-e2e0-438f-99f0-b7b39197091f\",\n                \"name\": \"java\",\n                \"level\": 5\n            }\n        ],\n        \"experience\": [\n            {\n                \"institution\": \"Minimal Software\",\n                \"function\": \"Team Leader\",\n                \"actual\": true,\n                \"initDate\": \"2018-02-28\",\n                \"endDate\": null,\n                \"description\": \"some work description and responsabilities\",\n                \"is_education\": false\n            }\n        ],\n        \"links\": [\n            {\n                \"id\": \"69d4b004-e2e0-438f-99f0-b7b39197091f\",\n                \"url\": \"https://somesocialnetwork.com/myprofile\",\n                \"social\": 3\n            }\n        ],\n        \"companies\": [\n            {\n                \"id\": \"69d4b004-e2e0-438f-99f0-b7b39197091f\",\n                \"name\": \"Some company\",\n                \"logo\": \"564fd83d-d652-429a-99f0-b7b39197091f.png\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "01) Register user",
    "group": "Authentication",
    "name": "userRegister",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>valid user email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>valid user name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "birthdate",
            "description": "<p>(optional) user birthdate</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "city",
            "description": "<p>(optional) user living city</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country_code",
            "description": "<p>(optional) must follow the standard ISO 3166 alpha-2</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "photo",
            "description": "<p>(optional) user profile photo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) user description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>jwt valid for 8 hours and must be placed at &quot;Authorization&quot; header</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/businessarea",
    "title": "01) List",
    "group": "Business",
    "name": "listBusiness",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "business",
            "description": "<p>business area list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"business\": [\n {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"International Relationships\"\n },\n {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"Software Development\"\n }\n]}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/business.js",
    "groupTitle": "Business",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/business/:id/company",
    "title": "02) List Companies",
    "group": "Business",
    "name": "listBusinessCompanies",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "company",
            "description": "<p>companies list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"company\": [\n        {\n            \"id\": \"69d4b004-e2e0-438f-99f0-b7b39197091f\",\n            \"name\": \"Some company\",\n            \"logo\": null\n        }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/business.js",
    "groupTitle": "Business",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/company/:id/department",
    "title": "10) Add department",
    "group": "Company",
    "name": "addDepartment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>valid name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>(optional) valid email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>(optional) must follow E.164 recommendation</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sponsor_email",
            "description": "<p>email of the department's sponsor, must be registered</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "department",
            "description": "<p>department created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"department\": {\n        \"id\": \"2ecf4114-7e24-47ee-8d48-f0f361e30403\",\n        \"name\": \"Markting\",\n        \"company_id\": \"e9be456d-23cd-4997-8dd6-408e6b1fec86\",\n        \"email\": \"depart@hat.com\",\n        \"phone\": \"911234564\",\n        \"updated_at\": \"2018-05-17T17:51:48.759Z\",\n        \"created_at\": \"2018-05-17T17:51:48.759Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/company/:id/nearshore",
    "title": "05) Add nearshore",
    "group": "Company",
    "name": "addNearshore",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "country_code",
            "description": "<p>must follow the standard ISO 3166 alpha-2</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "city",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>(optional) address</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "nearshore",
            "description": "<p>created nearshore</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"nearshore\": {\n        \"id\": \"816a3a62-5755-4afe-9a27-7a09af5e5085\",\n        \"country_code\": \"PT\",\n        \"city\": \"Lisboa\",\n        \"address\": \"Parque das Nações nº12\",\n        \"company_id\": \"e9be456d-23cd-4997-8dd6-408e6b1fec86\",\n        \"updated_at\": \"2018-05-17T17:53:59.244Z\",\n        \"created_at\": \"2018-05-17T17:53:59.244Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/company/:id/websection",
    "title": "07) Add websection",
    "group": "Company",
    "name": "addWebsection",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>description of the section</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>(optional) code of the section layout</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "image",
            "description": "<p>(optional) image filename to section</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "nearshore",
            "description": "<p>created nearshore</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"websection\": {\n        \"id\": \"2befd00b-3af0-4b83-a9d7-b49f4e7320d5\",\n        \"title\": \"who we are\",\n        \"text\": \"Some company\",\n        \"image\": \"picture.jpg\",\n        \"code\": 1,\n        \"company_id\": \"e9be456d-23cd-4997-8dd6-408e6b1fec86\",\n        \"updated_at\": \"2018-05-17T18:03:35.244Z\",\n        \"created_at\": \"2018-05-17T18:03:35.244Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/company",
    "title": "01) Create",
    "group": "Company",
    "name": "createCompany",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>valid name</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "business[]",
            "description": "<p>business area names</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>(optional) valid email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>(optional) must follow E.164 recommendation</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) company description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "logo",
            "description": "<p>(optional) logo filename</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "banner",
            "description": "<p>(optional) banner filename</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "collaborators",
            "description": "<p>(optional) number of collaborators</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "website",
            "description": "<p>(optional) external link</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n   \"name\": \"Instituto Baldes de Massa\",\n   \"business\": [\"Software Solutions\"]\n }",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "company",
            "description": "<p>created company</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/company/:id",
    "title": "04) Update",
    "group": "Company",
    "name": "getCompany",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>(optional) valid name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) company description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "logo",
            "description": "<p>(optional) logo filename</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "banner",
            "description": "<p>(optional) banner filename</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "collaborators",
            "description": "<p>(optional) number of collaborators</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "website",
            "description": "<p>(optional) external link</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/company/:id",
    "title": "03) Get",
    "group": "Company",
    "name": "getCompany",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "company",
            "description": "<p>company profile</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"company\": {\n   \"id\": \"01f52a4c-fc49-4a97-bbe0-c75e4679cd33\",\n   \"name\": \"Enterprise Inc\",\n   \"logo\": \"e9be456d-23cd-4997-8dd6-408e6b1fec86.jpg\",\n      \"banner\": \"e9be456d-23cd-4997-8dd6-408e6b1fec86.jpg\",\n      \"collaborators\": \"123\",\n      \"website\": \"enterprise.some.com\"\n   \"BusinessArea\": [\n     {\n       \"id\": \"f8ae926f-39d1-43f5-bdfa-36a2c39c894c\",\n       \"name\": \"International Relationships\"\n     }\n   ],\n   \"Departments\": [],\n   \"Nearshores\": [],\n   \"Websections\": []\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/company",
    "title": "02) List",
    "group": "Company",
    "name": "listCompanies",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "company",
            "description": "<p>companies list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"company\": [\n {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"International Relationships\",\n   \"logo\": \"e9be456d-23cd-4997-8dd6-408e6b1fec86.jpg\"\n },\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/company/:id",
    "title": "04) Remove",
    "group": "Company",
    "name": "removeCompany",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>company id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/company/:cid/department/:did",
    "title": "11) Remove department",
    "group": "Company",
    "name": "removeDepartment",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns false if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/company/:cid/nearshore/:nid",
    "title": "06) Remove nearshore",
    "group": "Company",
    "name": "removeNearshore",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns false if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/company/:cid/websection/:wid",
    "title": "09) Remove websection",
    "group": "Company",
    "name": "removeNearshore",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns false if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/company/:cid/websection/:wid",
    "title": "08) Update websection",
    "group": "Company",
    "name": "updateWebsection",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>description of the section</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>(optional) code of the section layout</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "image",
            "description": "<p>(optional) image filename to section</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns false if was successfuly updated</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/company.js",
    "groupTitle": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/department/:id/user",
    "title": "01) Add user",
    "group": "Department",
    "name": "addUserToDepartment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>department id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email to add</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "is_sponsor",
            "description": "<p>flag to add usr as sponsor</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly added</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/department.js",
    "groupTitle": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/department/:id/user",
    "title": "02) Get users",
    "group": "Department",
    "name": "getUsersfromDepartment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>department id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "users",
            "description": "<p>users list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"users\": [\n        {\n            \"id\": \"9c8db06b-ac5e-40a1-97ea-4e85ad3a7a65\",\n            \"name\": \"cf4a6fb4db779c1b361c2f8567f178c9\",\n            \"email\": \"00aad73d9d771cda1603febc3eefa84a\",\n            \"photo\": \"9c8db06b-ac5e-40a1-97ea-4e85ad3a7a65.jpg\"\n        },\n        {\n            \"id\": \"c3ed5136-0286-433c-b92a-e38be3fbb854\",\n            \"name\": \"8b450a269a397b04ea10c4b4586a8535\",\n            \"email\": \"2c55657e2a3b6a41610c61996ef6d1ca\",\n            \"photo\": \"9c8db06b-ac5e-40a1-97ea-4e85ad3a7a65.jpg\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/department.js",
    "groupTitle": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/department/:did/user/:uid",
    "title": "03) remove user",
    "group": "Department",
    "name": "removeUserFromDepartment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":did",
            "description": "<p>department id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":uid",
            "description": "<p>user id to remove</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/department.js",
    "groupTitle": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/file/:id",
    "title": "02) Download",
    "group": "Files",
    "name": "fileDownload",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>filename</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/manage.js",
    "groupTitle": "Files",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/file",
    "title": "01) Upload",
    "group": "Files",
    "name": "fileUpload",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "name",
            "description": "<p>html input name must be &quot;file&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>new filename to file</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/v1.0.0/manage.js",
    "groupTitle": "Files"
  },
  {
    "type": "put",
    "url": "/publication/:id/authorize",
    "title": "05) Authorize publication",
    "group": "Publication",
    "name": "authorizePublication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>publication id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly authorized</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/publication.js",
    "groupTitle": "Publication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/publication",
    "title": "01) Create",
    "group": "Publication",
    "name": "createPublication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>publication title</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "resume",
            "description": "<p>(optional) publication resume to feed</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>publication full description</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "brand_image",
            "description": "<p>(optional) image filename to brand image</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "detailed_image",
            "description": "<p>(optional) image filename to details</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "company_id",
            "description": "<p>related company id</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "tag[]",
            "description": "<p>tags names</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"title\":\"Publication title\",\n    \"resume\":\"Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.\",\n    \"text\":\"Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.\",\n    \"brand_image\":\"69d4b004-e2e0-438f-99f0-b7b39197091f.jpg\",\n    \"detailed_image\":\"b96fc30e-16da-4463-96af-d9fed68a0da9.png\",\n    \"company_id\":\"69d4b004-e2e0-438f-99f0-b7b39197091f\",\n    \"tag\":[\"hightech\", \".net\"]\n  }",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "publication",
            "description": "<p>created publication</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/publication.js",
    "groupTitle": "Publication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/publication/all",
    "title": "02) List all",
    "group": "Publication",
    "name": "listAllPublication",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "publication",
            "description": "<p>publications list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"publication\": [\n        {\n            \"datetime\": \"2018-05-24T17:02:41.834Z\",\n            \"likes\": 0,\n            \"dislikes\": 0,\n            \"approved\": true,\n            \"_id\": \"5b06f033c432f1310d6633ba\",\n            \"title\": \"Publication title\",\n            \"resume\": \"Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.\",\n            \"text\": \"Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.\",\n            \"brand_image\": \"69d4b004-e2e0-438f-99f0-b7b39197091f.jpg\",\n            \"detailed_image\": \"b96fc30e-16da-4463-96af-d9fed68a0da9.png\",\n            \"sender\": \"f52273ea-f05f-4d3b-ac57-a974060526b7\",\n            \"company_id\": \"0a9f8e01-88f4-4809-a4b9-15f4399b22bb\",\n            \"company_name\": \"Instituto Baldes De Massa 2\",\n            \"company_logo\": \"b96fc30e-16da-4463-96af-d9fed68a0da9.png\"\n        }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/publication.js",
    "groupTitle": "Publication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/publication/company/:id",
    "title": "04) List by company",
    "group": "Publication",
    "name": "listPublicationsByCompany",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>company id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "publication",
            "description": "<p>publications list by company</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"publication\": [\n        {\n            \"datetime\": \"2018-05-24T17:02:41.834Z\",\n            \"likes\": 0,\n            \"dislikes\": 0,\n            \"approved\": true,\n            \"_id\": \"5b06f033c432f1310d6633ba\",\n            \"title\": \"Publication title\",\n            \"resume\": \"Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.\",\n            \"text\": \"Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.\",\n            \"brand_image\": \"69d4b004-e2e0-438f-99f0-b7b39197091f.jpg\",\n            \"detailed_image\": \"b96fc30e-16da-4463-96af-d9fed68a0da9.png\",\n            \"sender\": \"f52273ea-f05f-4d3b-ac57-a974060526b7\",\n            \"company\": \"69d4b004-e2e0-438f-99f0-b7b39197091f\"\n        }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/publication.js",
    "groupTitle": "Publication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/publication/tag/:id",
    "title": "03) List by tag",
    "group": "Publication",
    "name": "listPublicationsByTag",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>tag id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "publication",
            "description": "<p>publications list by tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"publication\": [\n        {\n            \"datetime\": \"2018-05-24T17:02:41.834Z\",\n            \"likes\": 0,\n            \"dislikes\": 0,\n            \"approved\": true,\n            \"_id\": \"5b06f033c432f1310d6633ba\",\n            \"title\": \"Publication title\",\n            \"resume\": \"Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.\",\n            \"text\": \"Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.\",\n            \"brand_image\": \"69d4b004-e2e0-438f-99f0-b7b39197091f.jpg\",\n            \"detailed_image\": \"b96fc30e-16da-4463-96af-d9fed68a0da9.png\",\n            \"sender\": \"f52273ea-f05f-4d3b-ac57-a974060526b7\",\n            \"company_id\": \"0a9f8e01-88f4-4809-a4b9-15f4399b22bb\",\n            \"company_name\": \"Instituto Baldes De Massa 2\",\n            \"company_logo\": \"b96fc30e-16da-4463-96af-d9fed68a0da9.png\"\n        }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/publication.js",
    "groupTitle": "Publication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/publication/:id",
    "title": "06) Remove publication",
    "group": "Publication",
    "name": "removePublication",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>publication id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>returns true if was successfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/publication.js",
    "groupTitle": "Publication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/skill",
    "title": "01) List",
    "group": "Skill",
    "name": "listSkill",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "skill",
            "description": "<p>skill list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"skill\": [\n        {\n            \"id\": \"c6db7ebc-aebb-4977-b0cd-8cf0c4c7d7df\",\n            \"name\": \"NodeJS\"\n        }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/skill.js",
    "groupTitle": "Skill",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/tag",
    "title": "01) List",
    "group": "Tag",
    "name": "listTag",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tag",
            "description": "<p>tags list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n    \"tag\": [\n        {\n            \"id\": \"c6db7ebc-aebb-4977-b0cd-8cf0c4c7d7df\",\n            \"name\": \"NodeJS\"\n        }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/tag.js",
    "groupTitle": "Tag",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/my/experience",
    "title": "03) Add experience",
    "group": "User",
    "name": "addExperience",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "institution",
            "description": "<p>institution,</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "function",
            "description": "<p>function name,</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "actual",
            "description": "<p>flag indicating if still doing function,</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "initDate",
            "description": "<p>init function date,</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "endDate",
            "description": "<p>end function date,</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>function description,</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "is_education",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "request example:",
          "content": "{\n \"institution\": \"Minimal Software\",\n \"function\": \"Team Leader\",\n \"actual\": true,\n \"initDate\": \"2018-02-28\",\n \"endDate\": null,\n \"description\": \"some work description and responsabilities\",\n \"is_education\": false\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "experience",
            "description": "<p>return the created experience with id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/my/link",
    "title": "01) Add link",
    "group": "User",
    "name": "addLink",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": "<p>personal profile</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "social",
            "description": "<p>social network array index</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request example:",
          "content": "{\n   \"url\": \"https://www.linkedin.com/in/admin-example-1a8a44144/\",\n   \"social\":2\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "link",
            "description": "<p>return the created link with id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/my/skill",
    "title": "05) Add skill",
    "group": "User",
    "name": "addSkill",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>skill/tecnology name</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "level",
            "description": "<p>skill level, (1-5)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request example:",
          "content": "{\n    \"name\": \"NodeJS\",\n    \"level\": \"3\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "skill",
            "description": "<p>return the create skill with id</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/my/experience/:id",
    "title": "04) Remove experience",
    "group": "User",
    "name": "removeExperience",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>experience id to remove</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/my/link/:id",
    "title": "02) Remove link",
    "group": "User",
    "name": "removeLink",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>link id to remove</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/my/skill/:id",
    "title": "06) Remove skill",
    "group": "User",
    "name": "removeSkill",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "< token >",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Accept-Version",
            "defaultValue": "1.0.0",
            "description": ""
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>skill id to remove</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "result",
            "description": "<p>return true if was sucessfuly removed</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/v1.0.0/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>http status code: 500 to business logic errors and 401 to unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "error",
            "description": "<p>error description</p>"
          }
        ]
      }
    }
  }
] });
