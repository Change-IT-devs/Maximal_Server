const mongoose = require("mongoose");
const Group = require("../schemas/Group");
const ObjectId = mongoose.Types.ObjectId;

exports.getAll = async (req, res, next) => {
  try {
    const groups = await Group.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
          pipeline: [
            {
              $project: {
                name: 1,
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
          pipeline: [
            {
              $project: {
                name: 1,
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $project: {
          name: 1,
          time: 1,
          days: 1,
          course: { $arrayElemAt: ["$course.name", 0] },
          teacher: { $arrayElemAt: ["$teacher.name", 0] },
        },
      },
    ]);

    res.json(groups);
  } catch (e) {
    console.log(e.message);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const group = await Group.create({ ...req.body });

    res.json(group);
  } catch (e) {
    console.log(e.message);
  }
};

exports.getOne = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const group1 = await Group.findOne({ _id: groupId })
      .populate("course teacher", { name: 1, price: 1, phone: 1 })
      .populate("students", { paymentHistory: 0 });

    const group = await Group.aggregate([
      {
        $match: {
          _id: new ObjectId(groupId),
        },
      },
    ]);

    res.json({ ...group[0] });
  } catch (e) {
    console.log(e.message);
  }
};

exports.editOne = async (req, res, next) => {
  const { groupId } = req.params;
  const group = req.body;
  try {
    const newGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        ...group,
        _id: groupId,
      },
      { new: true }
    );

    res.json(newGroup);
  } catch (e) {
    console.log(e.message);
  }
};

exports.removeOne = async (req, res, next) => {
  const { groupId } = req.params;

  try {
    await Group.deleteOne({ _id: groupId });

    res.json({ success: true, message: "Group id deleted" });
  } catch (e) {
    console.log(e.message);
  }
};

exports.detachField = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.updateOne(
      { _id: groupId },
      {
        $unset: req.body,
      }
    );

    res.json({ success: true, message: "group is edited" });
  } catch (e) {}
};

exports.addStudents = async (req, res) => {
  const { groupId } = req.params;

  try {
    const data = await Group.updateOne(
      { _id: groupId },
      {
        $push: {
          students: {
            $each: [...req.body],
          },
        },
      }
    );

    res.json({ success: true, message: "students are added" });
  } catch (e) {
    console.log(e);
  }
};

exports.removeStudent = async (req, res) => {
  const { groupId } = req.params;

  try {
    await Group.updateOne(
      { _id: groupId },
      {
        $pull: {
          students: req.body.student,
        },
      }
    );

    res.json({ success: true, message: "student is deleted from group" });
  } catch (e) {
    console.log(e);
  }
};

exports.getMinGroups = async (req, res) => {
  try {
    const data = await Group.find({}, { name: 1, students: 1, days: 1 });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
