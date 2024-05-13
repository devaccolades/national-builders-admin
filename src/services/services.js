import { api } from "../axios/axios";

// ----------------------------Post methods-------------------------------------//

const AddBranchApi = (values) => {
  return api
    .post('general/branch/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddAmenitiesApi = (values) => {
  return api
    .post('project/amenities/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddProjectApi = (values) => {
  return api
    .post('project/project-add/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddProjectImagesApi = (values) => {
  return api
    .post('project/project-images-add/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddFloorPlanImagesApi = (values) => {
  return api
    .post('project/floor-plan-images-add/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddProjectSpecificationApi = (values) => {
  return api
    .post('project/specifications-add/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddProjectDistanceApi = (values) => {
  return api
    .post('project/project-distance-add/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddRentalsApi = (values) => {
  return api
    .post('project/rental/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddKeyHandOverApi = (values) => {
  return api
    .post('general/key-handover/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddTestimoniealsApi = (values) => {
  return api
    .post('general/testimonieals/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddBlogsApi = (values) => {
  return api
    .post('general/blogs/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddNewsAndEventsApi = (values) => {
  return api
    .post('general/news-and-events/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const AddSeoApi = (values) => {
  return api
    .post('general/seo/', values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

// ----------------------------Get methods-------------------------------------//

const getProjectCountApi = () => {
  return api
    .get('project/project-count-get/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getEnquiryApi = () => {
  return api
    .get('project/enquiry-list/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};


const getBranchApi = () => {
  return api
    .get('general/branch/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getBranchDropDownApi = () => {
  return api
    .get('general/company-branches-dropdown/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getAllAmenitiesApi = () => {
  return api
    .get('project/amenities/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getAllProjectsApi = () => {
  return api
    .get('project/project-get/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getSingleProjectsApi = (slug) => {
  return api
    .get(`project/project-get/${slug}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getProjectImagessApi = (projectId) => {
  return api
    .get(`project/project-images-get/${projectId}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getFloorPlanImagessApi = (projectId) => {
  return api
    .get(`project/floor-plan-images-get/${projectId}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getProjectAmenitiesApi = (projectId) => {
  return api
    .get(`project/project-amenities-get/${projectId}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getProjectSpecificationsApi = (projectId) => {
  return api
    .get(`project/specifications-get/${projectId}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getProjectDistanceApi = (projectId) => {
  return api
    .get(`project/project-distance-get/${projectId}/`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getRentalsApi = () => {
  return api
    .get('project/rental/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const getKeyHandOversApi = () => {
  return api
    .get('general/key-handover/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const getTestimoniealsApi = () => {
  return api
    .get('general/testimonieals/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getProjectDropDownApi = () => {
  return api
    .get('project/project-dropdown-list/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};
const getBlogsApi = () => {
  return api
    .get('general/blogs/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getNewsAndEventsApi = () => {
  return api
    .get('general/news-and-events/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const getSeoApi = () => {
  return api
    .get('general/seo/', {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

// ----------------------------Put / patch methods-------------------------------------//

const EditEnquiryReadedApi = (values, id) => {
  return api
    .patch(`project/enquiry/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditBranchApi = (values, id) => {
  return api
    .put(`general/branch/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};


const ChangeBrangeSelectionApi = (values, id) => {
  return api
    .patch(`general/branch-selection/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditAmenitieschApi = (values, id) => {
  return api
    .patch(`project/amenities/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditProjectApi = (values, slug) => {
  return api
    .patch(`project/project-update/${slug}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditProjectImagesApi = (values, id) => {
  return api
    .patch(`project/project-images-update/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditFloorPlanImagesApi = (values, id) => {
  return api
    .patch(`project/floor-plan-images-update/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const UpdateAmenitiesApi = (values, projectId) => {
  return api
    .patch(`project/project-amenities-add/${projectId}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditSpecificationApi = (id,values) => {
  return api
    .patch(`project/specifications-update/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const EditDistanceApi = (id,values) => {
  return api
    .patch(`project/project-distance-edit/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditRentaleApi = (values,id) => {
  return api
    .patch(`project/rental/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const EditKeyHandOverApi = (values,id) => {
  return api
    .patch(`general/key-handover/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditTestimoniealsApi = (values,id) => {
  return api
    .patch(`general/testimonieals/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const EditBlogApi = (values,id) => {
  return api
    .patch(`general/blogs/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const EditNewsAndEventApi = (values,id) => {
  return api
    .patch(`general/news-and-events/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const EditSeoApi = (values,id) => {
  return api
    .patch(`general/seo/${id}/`, values, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};


// ----------------------------Delete methods-------------------------------------//
const DeleteBranchApi = (id) => {
  return api
    .delete(`general/branch/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteProjectApi = (id) => {
  return api
    .delete(`project/project-delete/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteAmenitieschApi = (id) => {
  return api
    .delete(`project/amenities/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteProjectImageApi = (id) => {
  return api
    .delete(`project/project-images-delete/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteFloorPlanImageApi = (id) => {
  return api
    .delete(`project/floor-plan-images-delete/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteProjectspecificationApi = (id) => {
  return api
    .delete(`project/specifications-delete/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const DeleteDistanceApi = (id) => {
  return api
    .delete(`project/project-distance-delet/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteRentalApi = (id) => {
  return api
    .delete(`project/rental/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const DeleteKeyHandOverApi = (id) => {
  return api
    .delete(`general/key-handover/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteTestimoniealsApi = (id) => {
  return api
    .delete(`general/testimonieals/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};
const DeleteBlogApi = (id) => {
  return api
    .delete(`general/blogs/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteNewsAndEventApi = (id) => {
  return api
    .delete(`general/news-and-events/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

const DeleteSeoApi = (id) => {
  return api
    .delete(`general/seo/${id}/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('Error posting:', error);
      throw error;
    });
};

export {
  getProjectCountApi,
  
  getEnquiryApi,
  EditEnquiryReadedApi,

  AddBranchApi,
  getBranchApi,
  EditBranchApi,
  DeleteBranchApi,
  ChangeBrangeSelectionApi,
  getBranchDropDownApi,

  AddAmenitiesApi,
  EditAmenitieschApi,
  DeleteAmenitieschApi,
  getAllAmenitiesApi,

  AddProjectApi,
  EditProjectApi,
  getAllProjectsApi,
  getSingleProjectsApi,
  DeleteProjectApi,
  getProjectDropDownApi,

  AddProjectImagesApi,
  getProjectImagessApi,
  EditProjectImagesApi,
  DeleteProjectImageApi,

  getFloorPlanImagessApi,
  AddFloorPlanImagesApi,
  EditFloorPlanImagesApi,
  DeleteFloorPlanImageApi,

  getProjectAmenitiesApi,
  UpdateAmenitiesApi,

  getProjectSpecificationsApi,
  AddProjectSpecificationApi,
  EditSpecificationApi,
  DeleteProjectspecificationApi,

  getProjectDistanceApi,
  AddProjectDistanceApi,
  EditDistanceApi,
  DeleteDistanceApi,

  getRentalsApi,
  AddRentalsApi,
  EditRentaleApi,
  DeleteRentalApi,

  getKeyHandOversApi,
  AddKeyHandOverApi,
  EditKeyHandOverApi,
  DeleteKeyHandOverApi,

  getTestimoniealsApi,
  AddTestimoniealsApi,
  EditTestimoniealsApi,
  DeleteTestimoniealsApi,

  getBlogsApi,
  AddBlogsApi,
  EditBlogApi,
  DeleteBlogApi,

  getNewsAndEventsApi,
  AddNewsAndEventsApi,
  EditNewsAndEventApi,
  DeleteNewsAndEventApi,

  getSeoApi,
  AddSeoApi,
  EditSeoApi,
  DeleteSeoApi,
};
