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


// ----------------------------Get methods-------------------------------------//

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


// ----------------------------Put / patch methods-------------------------------------//

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



export {
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

  AddProjectImagesApi,
  getProjectImagessApi,
  EditProjectImagesApi,
  DeleteProjectImageApi,

  getFloorPlanImagessApi,
  AddFloorPlanImagesApi,
  EditFloorPlanImagesApi,
  DeleteFloorPlanImageApi,

  getProjectAmenitiesApi,
};
