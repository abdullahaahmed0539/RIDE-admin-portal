const router = require("express").Router();
const { allRequests } = require("../controllers/requests/allRequests");
const { requestDetails } = require("../controllers/requests/requestDetails");
const {
  changeRequestStatus,
} = require("../controllers/requests/changeRequestStatus");
const adminAuth = require('../middleware/adminAuth')

router.route("/all_requests").get(adminAuth, allRequests);
router.route("/request_details").get(adminAuth, requestDetails);
router.route("/change_request_status").patch(adminAuth, changeRequestStatus); 

module.exports = router;
