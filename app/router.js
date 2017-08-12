import * as router from 'page';

// Controllers
import indexController from './controllers/index-controller';
import eventDetailController from './controllers/event-detail-controller';

// Templates
import errorTemplate from '../templates/error.hbs';

const RENDER_ERROR = 'Unable to render page';

const clearDOM = () => {
  const container = document.querySelector('#app-container');
  container.innerHTML = '';
}

const parseQueryString = (queryString) => {
  const query = window.location.search.substring(1);
  const pairs = query.split('&');
  const result = {};

  for (var i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return result;
}

router('/', (context) => {
  let queryString = {};

  if (context.querystring) {
    queryString = parseQueryString(context.querystring);
  }

  // show a loader on page
  // make a request for data
  // inject data into the view
  // render the page
  indexController.render(queryString, (err, html) => {
    clearDOM();

    if (err) {
      html = errorTemplate({
        error: RENDER_ERROR
      });
    }

    document.querySelector('#app-container').innerHTML = html;
  });
});

router('/event/:eventId', (context) => {
  const params = {
    eventId: context.params.eventId,
    queryString: parseQueryString(context.querystring)
  };

  eventDetailController.render(params, (err, html) => {
    clearDOM();

    if (err) {
      html = errorTemplate({
        error: RENDER_ERROR
      });
    }

    document.querySelector('#app-container').innerHTML = html;
  });
});

router.start();
