// copy README.md and LICENSE.md, so they will be added to package
import { copy } from 'fs-extra';

const filesToCopy = ['README.md', 'LICENSE.md'];

const copyFiles = async () => {
  filesToCopy.forEach((file) => copy(file, `extension/${file}`));
};

copyFiles();
