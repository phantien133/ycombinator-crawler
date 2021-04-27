import { ROUTES, TARGET_LIST } from './constant';
import RestApi from './RestApi';

class NewsApi extends RestApi {
  list(page) {
    return this.client.get(ROUTES.listPath, {
      params: {
        page,
        list_path: TARGET_LIST,
      },
    });
  }

  detail(id, link) {
    return this.client.get(ROUTES.detailPath, {
      params: {
        id,
        link,
      },
    });
  }
}

export const newsApi = new NewsApi();
