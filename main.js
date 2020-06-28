const core = require('@actions/core');
const fs = require('fs');

// Setup Docker
const Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

try {

  // Get inputs
  var nakama_version = core.getInput('nakamaVersion');
  var module_name = core.getInput('moduleDirectory');

  // Determine docker image for building
  var docker_image = 'heroiclabs/nakama-pluginbuilder:' + nakama_version;

  process.chdir(module_name);

  // Pull docker image for building
  console.log("Pulling build image...");
  docker.pull(docker_image, function(err, stream)
  {

    docker.modem.followProgress(stream, onFinished, onProgress);

    // Wait to run build until after pull complete
    function onFinished(err, output)
    {
      console.log("Starting build...")
      docker.run(docker_image, ['build', '-buildmode=plugin', '-trimpath', '-o', module_name + '.so'], process.stdout, 
      
      // Mount working directory to `/builder`
      { HostConfig: { Binds: [ process.cwd() + ":/builder" ] }},
      
      function (err, data, container) {

        if(err)
        {
          console.log(err);
        }

        // Check for binary
        if (fs.existsSync(module_name +'.so')) {
          console.log("Build success!");
          core.setOutput("binary", module_name + "/" + module_name + "so");
        }
        else
        {
          console.log("Build failed!");
        }
      
        process.chdir("..");
      })
    }
    function onProgress(event) {}

  });

} catch (error) {
  core.setFailed(error.message);
}