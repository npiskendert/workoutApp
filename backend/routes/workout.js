const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controller/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = require("express").Router();

router.use(requireAuth);

router.post("/", createWorkout);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.put("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
