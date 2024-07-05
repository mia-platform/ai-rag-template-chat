/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */

/*
*  It hanldes `react-int` strings with dynamic import.
*  If your app is not multi-language, use only a language and you can import it directly
*/

type MessagesType = {
    [key: string]: any;
};

const messages: MessagesType = {
  en: import('./locales/en.json'),
  it: import('./locales/it.json')
}

export default messages
