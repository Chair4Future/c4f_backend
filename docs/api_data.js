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
            "field": "phone",
            "description": "<p>(optional) must follow E.164 recommendation</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country_code",
            "description": "<p>must follow the standard ISO 3166 alpha-2</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "photo",
            "description": "<p>(optional) user profile photo</p>"
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
    "type": "post",
    "url": "/businessarea",
    "title": "01) Create",
    "group": "Business",
    "name": "createBusiness",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example:",
          "content": "{\n   \"name\": \"International Relationships\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "business",
            "description": "<p>business area created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"business\": {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"International Relationships\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/businessArea.js",
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
    "url": "/businessarea",
    "title": "02) List",
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
          "content": "{\n \"business\": [\n {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"International Relationships\"\n },\n {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"Software Development\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/v1.0.0/businessArea.js",
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
            "type": "string",
            "optional": false,
            "field": "business",
            "description": "<p>business area id</p>"
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n   \"name\": \"Instituto Baldes de Massa\",\n   \"business\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\"\n }",
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
            "description": "<p>companies list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \"company\": {\n   \"id\": \"01f52a4c-fc49-4a97-bbe0-c75e4679cd33\",\n   \"name\": \"IBM\",\n   \"description\": null,\n   \"User\": {\n     \"id\": \"16acf8fc-087f-4ef3-9236-83ebf42e3147\",\n     \"name\": \"8b450a269a397b04ea10c4b4586a8535\"\n   },\n   \"BusinessArea\": {\n     \"id\": \"f8ae926f-39d1-43f5-bdfa-36a2c39c894c\",\n     \"name\": \"International Relationships\"\n   },\n   \"Departments\": []\n }\n}",
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
          "content": "{\n \"company\": [\n {\n   \"id\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\",\n   \"name\": \"International Relationships\"\n },\n]",
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
    "url": "/department",
    "title": "01) Create",
    "group": "Department",
    "name": "createDepartment",
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
            "field": "business",
            "description": "<p>business area created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n   \"name\": \"Instituto Baldes de Massa\",\n   \"business\": \"7d9db945-d3f4-471a-a0f4-37f69c171dea\"\n }",
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
    "type": "get",
    "url": "/department/:id",
    "title": "02) Get",
    "group": "Department",
    "name": "getDepartment",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "department",
            "description": "<p>department profile</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example:",
          "content": "{\n \n }\n}",
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
  }
] });
