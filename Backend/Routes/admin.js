const express = require('express');
const {employee_details, remove_data_two, get_data_employee, update_data_employee, employeebulkregistration, employee_login, get_data_employee2} = require('../Controllers/employee_form');
const {students_register, remove_data, get_data_student, get_data_studentbyemail, student_login} = require('../Controllers/students_form');
const {post_event_details, update_data_event, get_data_event, delete_event_data, get_data_eventbyid, get_events_by_month, getEventsByDate} = require('../Controllers/add_event_form');
const post_attendence_details = require('../Controllers/attendence_form');
const {post_course_creation, viewcourse, getCourseById} = require('../Controllers/course_creation_form');
const { post_create_ojt, get_ojt_data, get_ojts_data_byIds, updateOJTInfo, delete_ojt_data, update_ojt_details } = require('../Controllers/create_ojt_form');
const {post_oja_data, get_oja_details, get_oja_details_byIds, updateOjaInfo, delete_oja_data, update_oja_details} = require('../Controllers/create_Oja_form');
const {post_ina_data, get_ina_data, get_ina_data_byIds, updateInaInfo, delete_Ina_data, update_ina_details}  = require('../Controllers/create_INA_form');
const { addQuestion, getQuestions, deleteQuestion } = require('../Controllers/mcq_Question_form');
const { createQuestion, getAllQuestions } = require('../Controllers/text_question_form');
const {post_training_budget, get_training_budget} = require('../Controllers/training_budget_form');
const { post_trainingRequestForm, get_trainingRequestData, get_trainingRequestByIds } = require('../Controllers/trainingRequest_form');
const  upload  = require('../MiddleWare/file');
const uploadFields = require('../MiddleWare/file');
const { postOjtAssignment, getOjtAssignedEmployee, checkEmployeeAssignment } = require('../Controllers/ojt_Assignment_form');
const { postOJAAssignment, checkEmployeeAssignmentOJA, getOJAAssignedEmployee } = require('../Controllers/oja_Assignment_form');
const { postINAAssignment, getINAAssignedEmployee, checkEmployeeAssignmentINA } = require('../Controllers/ina_Assignment_form');
const { createAssessment, getAllAssessments, deleteAssessmentById, getAssessmentById, submitAssessment, getQuestionsByCategory } = require('../Controllers/create_assessment_form');
const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require('../Controllers/create_quize_form');
const { createCAT, getAllCATs, getCATById, updateCAT, deleteCAT, getAllMCQQuestions, getCATByIdForRandomlyFive } = require('../Controllers/create_cat_form');
const CATResponse = require('../Modal/cat_response');
const { submitCATResponse, getCATResponse, getCATResponses, updateCATResponse, getCATResponseByEmployee, getAllCATResponse, getCATResults } = require('../Controllers/cat_response_form');
const { saveAssessmentResponse, getAllSubmittedAssessments, getAssessmentResponseById, getAssessmentStatus, getAssessmentDetails } = require('../Controllers/assessment_response_form');
const { createResponse, getQuizResponses, getResponse, getQuizStatus } = require('../Controllers/quize_response_form');
const { uploadExcelData, getAllExcelData } = require('../Controllers/excel_file_form');
const AssessmentResponse = '../Modal/assessment_response.js';
const CAT = '../Modal/create_cat.js';
const Assessment = require('../Modal/create_assessment');
const { assignCAT, getAssignedCATs } = require('../Controllers/assign_cat_form');
const { assignAssessment, getAssignedAssessments } = require('../Controllers/assign_assessment_form');
const { assignQuiz, getAssignedQuizes } = require('../Controllers/assigned_quiz_form');
const { getWaitlistedUsers, approveWaitlistedUser } = require('../Controllers/waitlistController');
const { assignAssessmentAttendies, getEmployeeAssignments } = require('../Controllers/assign_assessment_attendies_form');
const { saveProject, getProject, updateProjectMatrix, getEmployeeProjects } = require('../Controllers/hr_create_project_form');
const { saveTrainer, getTrainer } = require('../Controllers/add_trainer_form');
const authMiddleware = require('../MiddleWare/auth');
const { nominationValidator } = require('../MiddleWare/validator');
const nominationController = require('../Controllers/add_nomination_form');
const { submitTenderResponse, submitContractResponse, getApprovalsByProject } = require('../Controllers/project_approvals_form');
const EmployeeInfo = require('../Modal/employee_register');
const { saveRecruitmentPlan, getAllRecruitmentPlans, getRecruitmentPlanById, updateRecruitmentPlan, deleteRecruitmentPlan } = require('../Controllers/recruitment_plan_form');
// const auth = require('../middleware/auth'); // Assuming you have authentication middleware
// const { createAssessment } = require('../Controllers/create_assessment_form');
// const { create_Assessment } = require('../Controllers/create_assessment_form');
const protect = require('../MiddleWare/auth');
const { registerCandidate, getAllCandidates, getCandidateById, updateCandidate, deleteCandidate, getCandidateByUsername } = require('../Controllers/candidate_register_form');
const { assignCATsToCandidates, getCandidateCATs, getAllCATAssignments, updateCATAssignment, deleteCATAssignment } = require('../Controllers/candidate_cat_form');
const { startCandidateTest, submitCandidateTest, getCandidateResponses, getCandidateResponseById, getCATResponsesCandidate } = require('../Controllers/candidate_response_form');

const router = express.Router();

router.post('/employee_registration', employee_details);
router.delete('/employee_deletes/:_id', remove_data_two)
router.get('/employee_details_get', get_data_employee);
router.get('/employee_info_get/:id', get_data_employee2);
router.put('/employee_update/:_id', update_data_employee);
router.post('/employees_data_save', employeebulkregistration);
router.post('/employee_login', employee_login);

router.post('/students_registration', students_register);
router.delete('/studentsdelete/:_id',remove_data);
router.get('/student_details_get', get_data_student);
router.post('/student_details_getbyemail', get_data_studentbyemail);
router.post('/student_login', student_login);

router.get('/waitlisted-users', getWaitlistedUsers);
router.post('/approve-user', approveWaitlistedUser);

router.post('/add_events_data', post_event_details);
router.put('/event_details_updated/:_id', update_data_event);
router.get('/event_details_get', get_data_event);
router.get('/trainingeventbyid/:_id', get_data_eventbyid);
router.delete('/trainingevent_delete/:_id', delete_event_data);
router.get('/get_events_by_month', get_events_by_month);
router.get('/get_events_by_date', getEventsByDate);

router.post('/addtrainer', saveTrainer);
router.get('/getTrainer', getTrainer);

router.post('/send-nomination-emails',
  authMiddleware,
  nominationValidator,
  nominationController.sendNominationEmails
);
router.get('/confirm-training/:trainingId/:employeeId',
  nominationController.confirmAttendance,
)

router.post('/add_attendence_details', post_attendence_details);

router.post('/add_course_details', uploadFields, post_course_creation);
router.get('/viewcourse', viewcourse);
router.get('/view_Course/:id', getCourseById);

router.post('/create_ojt_form', post_create_ojt);
router.get('/get_Ojt_info', get_ojt_data);
router.delete('/ojt_data_delete/:_id', delete_ojt_data);
router.get('/get_ojts_byid/:_id', get_ojts_data_byIds);
router.post('/update_ojt_info', updateOJTInfo);
router.put('/ojt_details_updated/:_id', update_ojt_details);

router.post('/save-oja-form', post_oja_data);
router.get('/get_oja_info', get_oja_details);
router.delete('/oja_data_delete/:_id', delete_oja_data);
router.get('/get_oja_info_byids/:_id', get_oja_details_byIds);
router.put('/oja_details_updated/:_id', update_oja_details);
router.put('/update_oja_info/:id', updateOjaInfo);

router.post('/save_ina_data', post_ina_data);
router.get('/get_ina_dataInfo', get_ina_data);
router.delete('/ina_data_delete/:_id', delete_Ina_data);
router.get('/get_ina_dataById/:_id', get_ina_data_byIds);
router.put('/ina_details_updated/:_id', update_ina_details);
router.put('/update_ina_data/:id', updateInaInfo);

router.post('/add_employee_forOJT', postOjtAssignment);
router.get('/get_assigned_employees/:ojt_code', getOjtAssignedEmployee);
router.post('/check_employee_assignment', checkEmployeeAssignment);

router.post('/add_employee_forOJA', postOJAAssignment);
router.get('/get_assigned_employeeOJA/:oja_code', getOJAAssignedEmployee);
router.post('/check_employee_forOJA', checkEmployeeAssignmentOJA);

router.post('/add_employee_forINA', postINAAssignment);
router.get('/get_assigned_employeeINA/:ina_code', getINAAssignedEmployee);
router.post('/check_employee_forINA', checkEmployeeAssignmentINA);

router.post('/add_question', addQuestion);
router.get('/get_all_question', getQuestions);
router.delete('/delete_question/:id', deleteQuestion);

router.post('/add_textquestion', createQuestion);
router.get('/get_textquestion', getAllQuestions);

router.post('/create_training_budget', post_training_budget);
router.get('/get_training_budget_data', get_training_budget);

router.post('/training_request_form', post_trainingRequestForm);
router.get('/get_trainingrequestdata', get_trainingRequestData);
router.get('/get_trainingByID/:_id', get_trainingRequestByIds);

router.post('/assessment_data_save', createAssessment);
router.get('/assessment_data_fetch', getAllAssessments);
router.delete('/assessments_delete/:id', deleteAssessmentById);
router.get('/assessments_fetch_byid/:id', getAssessmentById);
router.post('/submit_assessment', submitAssessment);
router.get('/questions', getQuestionsByCategory)

router.post('/quize_data_save', createQuiz);
router.get('/quize_data_get', getQuizzes);
router.get('/quize_data_get_ById/:id', getQuizById);
router.put('/update_quize_data/:id', updateQuiz);
router.delete('/delete_quize_data/:id', deleteQuiz);

router.post('/save_cat_data', createCAT);
router.get('/get_all_cat', getAllCATs);
router.get('/get_cat_byid/:id', getCATById);
router.get('/get_cat_byID_randomlyFive/:id', getCATByIdForRandomlyFive);
router.put('/update_cat_data/:id', updateCAT);
router.delete('/delete_cat_data/:id', deleteCAT);
router.get('/api/questions/CAT', getAllMCQQuestions);

router.post('/submit_cat_response', submitCATResponse);
router.get('/all_cat_response', getAllCATResponse);
router.get('/cat_response/:responseId', getCATResponse);
router.get('/cat_responses/:catId', getCATResponses);
router.get('/get_cat_results/:catId', getCATResults);
router.put('/update-cat-response/:responseId', updateCATResponse);
router.get('/cat_response/:catId/:employeeId', getCATResponseByEmployee);

router.post('/assign_cat', assignCAT);
router.get('/get_assigned_cats/:userId', getAssignedCATs);

router.post('/assessment_responses', saveAssessmentResponse);
router.get('/assessment-responses/:assessmentId', getAllSubmittedAssessments);
router.get('/assessment-response-details/:responseId', getAssessmentDetails);
router.get('/get_assessment_responses_by_id/:id', getAssessmentResponseById);
router.get('/assessment_status/:assessmentId/:employeeId', getAssessmentStatus);

router.post('/assign_assessment', assignAssessment);
router.get('/get_assigned_assessments/:userId', getAssignedAssessments);

router.post('/assign_quiz', assignQuiz);
router.get('/get_assigned_quizes/:userId', getAssignedQuizes);

// Get unique categories from saved questions
router.get('/api/questions/categories', async (req, res) => {
    try {
      const uniqueCategories = await Assessment.aggregate([
        { $unwind: '$questions.mcq' },
        { 
          $group: {
            _id: {
              main: '$questions.mcq.category.main',
              sub: '$questions.mcq.category.sub'
            }
          }
        },
        {
          $project: {
            _id: 0,
            main: '$_id.main',
            sub: '$_id.sub'
          }
        }
      ]);
      
      res.json(uniqueCategories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
});
  
// Get questions by category
router.get('/api/questions', async (req, res) => {
    try {
      const { mainCategory, subCategory } = req.query;
      
      const questions = await Assessment.aggregate([
        { $unwind: '$questions.mcq' },
        {
          $match: {
            'questions.mcq.category.main': mainCategory,
            'questions.mcq.category.sub': subCategory
          }
        },
        {
          $project: {
            _id: '$questions.mcq._id',
            question: '$questions.mcq.question',
            options: '$questions.mcq.options',
            points: '$questions.mcq.points',
            maxCorrectAnswers: '$questions.mcq.maxCorrectAnswers',
            category: '$questions.mcq.category'
          }
        }
      ]);
      
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions' });
    }
});

router.post('/quize_response', createResponse);
// router.get('/get_quize_response/:quizId', getQuizResponses);
router.get('/quiz-responses', getQuizResponses);
router.get('/quiz-responses/:quizId', getQuizResponses); 
router.get('/quiz-response/:responseId', getResponse);
router.get('/quiz-status/:quizId/:employeeId', getQuizStatus);

router.post('/upload_excel', uploadExcelData);
router.get('/get_excel_Data', getAllExcelData);

router.post('/assign_assessment_attendies', assignAssessmentAttendies);
router.get('/employee_assignments/:employee_id', getEmployeeAssignments);

router.post('/save_projects', saveProject);
router.get('/get_projects', getProject);
router.put('/update_project_matrix', updateProjectMatrix);
router.get('/employee-projects/:employeeId', getEmployeeProjects);

router.put('/submit-tender-response', submitTenderResponse);
router.put('/submit-contract-response', submitContractResponse);
router.get('/project-approvals', getApprovalsByProject);

router.post('/save_recruitment_plan', saveRecruitmentPlan);
router.get('/recruitment_plans', getAllRecruitmentPlans);
router.get('/get_recruitment_plan/:id', getRecruitmentPlanById);
router.put('/update_recruitment_plan/:id', updateRecruitmentPlan);
router.delete('/delete_recruitment_plan/:id', deleteRecruitmentPlan);

router.post('/candidate_register', registerCandidate);
router.get('/get_all_candidates', getAllCandidates);
router.get('/get_candidate_username/:username', getCandidateByUsername);
router.get('/get_candidate/:id', getCandidateById);
router.put('/update_candidate/:id', updateCandidate);
router.delete('/delete_candidate/:id', deleteCandidate);

router.post('/assign_cat_candidate', assignCATsToCandidates);
router.get('/get_assigned_cats_candidates', getAllCATAssignments);
router.get('/get_assigned_cats_candidates/:candidateId', getCandidateCATs);
router.put('/update_assigned_cat/:id', updateCATAssignment);
router.delete('/delete_assigned_cat/:id', deleteCATAssignment);

router.post('/candidate_test_start', startCandidateTest);
router.post('/candidate_test_submit/:responseId', submitCandidateTest);
router.get('/get_cat_candidate_response/:candidateId', getCandidateResponseById);
router.get('/get_all_response_specific_candidate', getCandidateResponses);
router.get('/get_all_response_specific_cat', getCATResponsesCandidate);


module.exports = router;