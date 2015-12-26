var testsContext = require.context(".", true, /.*\.spec\.tsx?$/);
testsContext.keys().forEach(testsContext);
