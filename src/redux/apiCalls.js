import { publicRequest } from "./requestMethods";

export const addWorkshop = async (workshop) => {
  try {
    console.log(workshop);
    const res = await publicRequest.post(`/workshops`, workshop);
  } catch (err) {
    console.log(err);
  }
};

export const addActivity = async (activity) => {
  try {
    console.log(activity);
    const res = await publicRequest.post(`/activities`, activity);
  } catch (err) {
    console.log(err);
  }
};

export const addProject = async (project) => {
  try {
    console.log(project);
    const res = await publicRequest.post(`/projects`, project);
  } catch (err) {
    console.log(err);
  }
};

export const addArticle = async (article) => {
  try {
    const res = await publicRequest.post(`/articles`, article);
  } catch (err) {
    console.log(err);
  }
};

export const addOffer = async (offer) => {
  try {
    const res = await publicRequest.post(`/offers`, offer);
  } catch (err) {
    console.log(err);
  }
};

export const addNews = async (news) => {
  try {
    console.log(news);
    const res = await publicRequest.post(`/news`, news);
  } catch (err) {
    console.log(err);
    alert("uslo");
  }
};

export const addDonator = async (donator) => {
  try {
    const res = await publicRequest.post(`/donators`, donator);
  } catch (err) {
    console.log(err);
    alert("uslo");
  }
};

export const addReservation = async (reservation) => {
  try {
    const res = await publicRequest.post(`/reservations`, reservation);
  } catch (err) {
    console.log(err);
  }
};

export const addQuestion = async (question) => {
  try {
    const res = await publicRequest.post(`/questions`, question);
  } catch (err) {
    console.log(err);
  }
};

export const addApplication = async (application) => {
  try {
    const res = await publicRequest.post(`/applications`, application);
  } catch (err) {
    console.log(err);
  }
};

export const getWorkshops = async () => {
  try {
    const res = await publicRequest.get(`/workshops`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
