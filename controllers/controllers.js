import UserData from '../models/User.js';
import loginUser from '../models/loginModel.js';

const postData = async (req, res) => {

  const { applicationStatus, job, company, apiUrl, formattedDate, jobId, connectedOnLI, inquire, salary, callAI, emailFollowUp } = req.body

  if (!applicationStatus || !job || !company) {
    return res.status(401).json({ error: "error bro" })
  }

  try {
    const task = await UserData.create({ applicationStatus, job, company, apiUrl, jobId, connectedOnLI, inquire, salary, callAI, emailFollowUp, formattedDate, createdBy: req.user.userId }); 
    res.status(201).json({ task })
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const deleteDB = async (req, res) => {
  try {

    const del = await UserData.findByIdAndDelete(req.params.id)
    res.status(201).json(del)
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({ success: false, message: 'Server error' });
  }

}

const editData = async (req, res) => {
  const { applicationStatus } = req.body

  try {
    const edit = await UserData.findOneAndUpdate({ _id: req.params.id }, { applicationStatus }, { new: true }, { runValidators: true })
    res.status(201).json(edit)
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

const modalInputDataPatch = async (req, res) => {
  const { connectedOnLI, inquire, salary, emailFollowUp } = req.body

  try {
    const modalData = await UserData.findOneAndUpdate({ _id: req.params.id }, { connectedOnLI, inquire, salary, emailFollowUp }, { new: true }, { runValidators: true })
    res.status(201).json(modalData)
  } catch (error) {
    console.log(error)
     res.status(500).json({ success: false, message: 'Server error' });
  }
}

const fetchUserData = async (req, res) => {
  try {

    const entries = await UserData.find({ createdBy: req.user.userId }).lean();

    if (!entries) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, entries });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const fetchCurrentUsersName = async (req, res) => {
  try {

    const user = await loginUser.findById(req.user.userId).select('first').lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export {
  postData,
  deleteDB,
  editData,
  fetchUserData,
  modalInputDataPatch,
  fetchCurrentUsersName,
};
