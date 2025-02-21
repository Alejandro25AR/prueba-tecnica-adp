import { IFetchParams } from "../models/fetch.model";

const baseUrl = 'http://192.168.1.172:3000';

export const studentService = {
  getEnrolledSubjects: ():IFetchParams => ({ 
    url: `${baseUrl}/enrolled-subjects`,
    options: {
      method: "GET"
    }
  }),
  getStudent: ():IFetchParams => ({ 
    url: `${baseUrl}/student`,
    options: {
      method: "GET"
    }
  }),
  getSubjetsAvailables: ():IFetchParams => ({ 
    url: `${baseUrl}/subjects`,
    options: {
      method: "GET"
    }
  }),
}