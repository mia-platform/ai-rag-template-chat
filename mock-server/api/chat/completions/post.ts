/* eslint-disable camelcase */

const mockResponse = {
  message: 'Sure! Here is a variant of the "Hello World" program in C++:\n\n```cpp\n#include <iostream>\n\nint main() {\n    std::cout << "Hola Mundo" << std::endl;\n    return 0;\n}\n```\n\nThis variant will output "Hola Mundo" instead of "Hello World". Feel free to try it out and let me know if you have any other requests or questions!',
  references: [
    {
      url: 'https://docs.mia-platform.eu/docs/getting-started/mia-platform-overview',
      content: '## Mia-Platform products\nMia-Platform provides you with a suite of several products that supports you in governing your platform, tackling composable business, and making legacy systems coexist.\nThe products can be divided into two main categories: core products and additional components.'
    },
    {
      url: 'https://docs.mia-platform.eu/docs/runtime_suite/crud-service/overview_and_usage',
      content: '## CRUD Collection Properties\nSome collection field properties are predefined, others are custom and can be configured with different data types.\nAll properties can be indexed to speed up the data retrieval. The indexes configuration can be set in Console/Design/CRUD section.'
    },
    {
      url: 'https://docs.mia-platform.eu/docs/fast_data/what_is_fast_data',
      content: '### Making your company a Digital Platform\nSQL data residing in legacy systems can be quite challenging to integrate in modern systems. Moving data to MongoDB with the help of Fast Data, you will unlock the potential to become a real Digital Platform. Specifically, you will be able to:\n\nAutomatically expose the data through API, thanks to the CRUD service;\nAutomatically generate API and data documentation, thanks to the API Portal;\nScale horizontally with ease, thanks to MongoDB architecture.\nWith these new tools your company can grow faster than ever, become more connected, and fully become omnichannel.'
    },
    {
      url: 'https://docs.mia-platform.eu/docs/fast_data/architecture',
      content: 'On this page, you will find:\n* An overview of the services and technologies used in a Fast Data system;\n* A discussion over the architecture.'
    }
  ]
}

module.exports = (req, res) => {
  const {chat_query} = req.body
  if (chat_query.startsWith('413')) {
    res.delay(1500).status(413).send({
      message: '413 error'
    })
  } else if (chat_query.startsWith('500')) {
    res.delay(1500).status(500).send({
      message: '500 error'
    })
  } else {
    res.delay(1500).send({
      ...mockResponse
    })
  }
}
