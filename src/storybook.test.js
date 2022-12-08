import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

import path from 'path';

initStoryshots({
  test: (story) => {
    // FIXME Workaround for https://github.com/storybookjs/storybook/issues/16692
    const fileName = path.resolve(__dirname, '..', story.context.fileName);

    return multiSnapshotWithOptions()({
      ...story,
      context: { ...story.context, fileName },
    });
  },
});
