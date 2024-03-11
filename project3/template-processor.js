function processTemplateString(template, dictionary) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, p1) => {
      const property = p1.trim();
      return dictionary.hasOwnProperty(property) ? dictionary[property] : "";
    });
  }
  