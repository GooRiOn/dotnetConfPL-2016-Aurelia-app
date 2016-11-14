import {autoinject} from 'aurelia-dependency-injection';
import {Project, ProjectItem, CLIOptions, UI} from 'aurelia-cli';

@autoinject()
export default class PPPGenerator {
  constructor(private project: Project, private options: CLIOptions, private ui: UI) { }

  execute() {
    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the new item?')
      .then(name => {
        let fileName = this.project.makeFileName(name);
        let className = this.project.makeClassName(name);

        this.project.elements.add(
          ProjectItem.text(`${fileName}.js`, this.generateSource(className))
        );

        return this.project.commitChanges()
          .then(() => this.ui.log(`Created ${fileName}.`));
      });
  }

  generateSource(className) {
return `import {bindable} from 'aurelia-framework';

export class ${className} {
  @bindable value;

  valueChanged(newValue, oldValue) {

  }
}

`
  }
}

