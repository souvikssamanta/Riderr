# UBER Backend API

## Routes

### Captains

#### Register Captain
- **URL:** `/captains/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "password": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
  ```
- **Description:** Registers a new captain.

#### Login Captain
- **URL:** `/captains/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Description:** Logs in a captain.

#### Get Captain Profile
- **URL:** `/captains/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Description:** Retrieves the profile of the logged-in captain.

#### Logout Captain
- **URL:** `/captains/logout`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Description:** Logs out the captain.

