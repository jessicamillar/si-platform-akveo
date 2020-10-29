

function generateAdminActor() {
    var smqAdmin = {
    };
    
    smqAdmin.defer = function() {
        var deferred = {
            promise: null,
            resolve: null,
            reject: null
        };
        
        deferred.promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        
        return deferred;
    }

    smqAdmin.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqAdmin.showPingPongs = true` to get verbose logging.');
        smqAdmin.virtualHost = virtualHost;
        smqAdmin.username = username;
        smqAdmin.password = password;
        smqAdmin.rabbitEndpoint = smqAdmin.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqAdmin.Admin_all_connection = {};
        smqAdmin.messages = [];
        smqAdmin.waitingReply = [];
        
        smqAdmin.client = Stomp.client(smqAdmin.rabbitEndpoint);

        smqAdmin.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqAdmin.showPingPongs) return;
            else {
                if (m == "<<< ") delete m;
                let data = p || m || "STRING"; 
                let indexOfContentLength = data.indexOf("content-length:");
                let dataStart = data.indexOf("\n\n");
                if ((dataStart > indexOfContentLength) && (indexOfContentLength > 1)) {
                    data = (data.substring(dataStart, data.length - 1) || '');
                    if (data.startsWith('"')) data = data.substring(1);
                    if (data.endsWith('"')) data = data.substring(0, data.length - 1);
                    data = data.substring(data.indexOf('{'));
                    data = data.substring(0, data.lastIndexOf('}') + 1);
                    try {
                        data = JSON.parse(data);
                        if (data.AccessToken) data.AccessToken = 'ay_******xyz';
                    } catch(ex) {
                        console.error('ERROR PARSING DATA for debug output', ex, data);
                    }
                    m = m.substring(0, m.indexOf('\n\n'));
                }
                console.log("DEBUG: ", m, data || p); 
            }
        }

        smqAdmin.checkMessage = function(msg) {
            
               
        }

        var on_connect = function (x) {
            smqAdmin.Admin_all_connection = smqAdmin.client.subscribe("/exchange/admin.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqAdmin.messages.push(d);
                        smqAdmin.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqAdmin.showPingPongs) console.log('      --------  MESSAGE FOR smqAdmin: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqAdmin.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqAdmin.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqAdmin.waitingReply[corrID];
                            if (body && body.ErrorMessage) console.error("ERROR RECEIVED: " + body.ErrorMessage);
                            waitingDeferred.resolve(body, d);
                        }
                    };
                    if (after_connect) after_connect(x);
                };

        var on_error = function (frame) {
            frame = frame || { 'error': 'unspecified error' };
            console.error('ERROR On STOMP Client: ', frame.error, frame);
        };

        console.log('connecting to: ' + smqAdmin.rabbitEndpoint + ', using ' + username + '/' + password);
        smqAdmin.client.connect(smqAdmin.username, smqAdmin.password, on_connect, on_error, smqAdmin.virtualHost);
    };

    smqAdmin.disconnect = function() {
        if (smqAdmin && smqAdmin.client) 
        {
            smqAdmin.client.disconnect();
        }
    }

    smqAdmin.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqAdmin.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqAdmin.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdmin.AddStudentModule = function() {
            smqAdmin.AddStudentModule('{}');
        }

        smqAdmin.AddStudentModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Student Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addstudentmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetStudentModules = function() {
            smqAdmin.GetStudentModules('{}');
        }

        smqAdmin.GetStudentModules = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Student Modules - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getstudentmodules', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateStudentModule = function() {
            smqAdmin.UpdateStudentModule('{}');
        }

        smqAdmin.UpdateStudentModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Student Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatestudentmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteStudentModule = function() {
            smqAdmin.DeleteStudentModule('{}');
        }

        smqAdmin.DeleteStudentModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Student Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletestudentmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddBreathingExerciseVisualHook = function() {
            smqAdmin.AddBreathingExerciseVisualHook('{}');
        }

        smqAdmin.AddBreathingExerciseVisualHook = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Breathing Exercise Visual Hook - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addbreathingexercisevisualhook', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetBreathingExerciseVisualHooks = function() {
            smqAdmin.GetBreathingExerciseVisualHooks('{}');
        }

        smqAdmin.GetBreathingExerciseVisualHooks = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Breathing Exercise Visual Hooks - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getbreathingexercisevisualhooks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateBreathingExerciseVisualHook = function() {
            smqAdmin.UpdateBreathingExerciseVisualHook('{}');
        }

        smqAdmin.UpdateBreathingExerciseVisualHook = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Breathing Exercise Visual Hook - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatebreathingexercisevisualhook', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteBreathingExerciseVisualHook = function() {
            smqAdmin.DeleteBreathingExerciseVisualHook('{}');
        }

        smqAdmin.DeleteBreathingExerciseVisualHook = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Breathing Exercise Visual Hook - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletebreathingexercisevisualhook', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddUserRole = function() {
            smqAdmin.AddUserRole('{}');
        }

        smqAdmin.AddUserRole = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add User Role - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.adduserrole', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetUserRoles = function() {
            smqAdmin.GetUserRoles('{}');
        }

        smqAdmin.GetUserRoles = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get User Roles - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getuserroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateUserRole = function() {
            smqAdmin.UpdateUserRole('{}');
        }

        smqAdmin.UpdateUserRole = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update User Role - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateuserrole', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteUserRole = function() {
            smqAdmin.DeleteUserRole('{}');
        }

        smqAdmin.DeleteUserRole = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete User Role - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteuserrole', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddUser = function() {
            smqAdmin.AddUser('{}');
        }

        smqAdmin.AddUser = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add User - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.adduser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetUsers = function() {
            smqAdmin.GetUsers('{}');
        }

        smqAdmin.GetUsers = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Users - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getusers', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateUser = function() {
            smqAdmin.UpdateUser('{}');
        }

        smqAdmin.UpdateUser = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update User - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteUser = function() {
            smqAdmin.DeleteUser('{}');
        }

        smqAdmin.DeleteUser = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete User - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShardOriginator = function() {
            smqAdmin.AddShardOriginator('{}');
        }

        smqAdmin.AddShardOriginator = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Originator - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardoriginator', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShardOriginators = function() {
            smqAdmin.GetShardOriginators('{}');
        }

        smqAdmin.GetShardOriginators = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Originators - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardoriginators', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShardOriginator = function() {
            smqAdmin.UpdateShardOriginator('{}');
        }

        smqAdmin.UpdateShardOriginator = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Originator - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardoriginator', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShardOriginator = function() {
            smqAdmin.DeleteShardOriginator('{}');
        }

        smqAdmin.DeleteShardOriginator = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Originator - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardoriginator', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddExerciseFavorite = function() {
            smqAdmin.AddExerciseFavorite('{}');
        }

        smqAdmin.AddExerciseFavorite = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise Favorite - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexercisefavorite', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetExerciseFavorites = function() {
            smqAdmin.GetExerciseFavorites('{}');
        }

        smqAdmin.GetExerciseFavorites = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercise Favorites - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexercisefavorites', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateExerciseFavorite = function() {
            smqAdmin.UpdateExerciseFavorite('{}');
        }

        smqAdmin.UpdateExerciseFavorite = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise Favorite - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexercisefavorite', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteExerciseFavorite = function() {
            smqAdmin.DeleteExerciseFavorite('{}');
        }

        smqAdmin.DeleteExerciseFavorite = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise Favorite - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexercisefavorite', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddModule = function() {
            smqAdmin.AddModule('{}');
        }

        smqAdmin.AddModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetModules = function() {
            smqAdmin.GetModules('{}');
        }

        smqAdmin.GetModules = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Modules - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getmodules', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateModule = function() {
            smqAdmin.UpdateModule('{}');
        }

        smqAdmin.UpdateModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteModule = function() {
            smqAdmin.DeleteModule('{}');
        }

        smqAdmin.DeleteModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddCourseModule = function() {
            smqAdmin.AddCourseModule('{}');
        }

        smqAdmin.AddCourseModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Course Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addcoursemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetCourseModules = function() {
            smqAdmin.GetCourseModules('{}');
        }

        smqAdmin.GetCourseModules = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Course Modules - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getcoursemodules', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateCourseModule = function() {
            smqAdmin.UpdateCourseModule('{}');
        }

        smqAdmin.UpdateCourseModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Course Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatecoursemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteCourseModule = function() {
            smqAdmin.DeleteCourseModule('{}');
        }

        smqAdmin.DeleteCourseModule = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Course Module - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletecoursemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddVibrationalCategory = function() {
            smqAdmin.AddVibrationalCategory('{}');
        }

        smqAdmin.AddVibrationalCategory = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Vibrational Category - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addvibrationalcategory', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetVibrationalCategories = function() {
            smqAdmin.GetVibrationalCategories('{}');
        }

        smqAdmin.GetVibrationalCategories = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Vibrational Categories - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getvibrationalcategories', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateVibrationalCategory = function() {
            smqAdmin.UpdateVibrationalCategory('{}');
        }

        smqAdmin.UpdateVibrationalCategory = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Vibrational Category - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatevibrationalcategory', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteVibrationalCategory = function() {
            smqAdmin.DeleteVibrationalCategory('{}');
        }

        smqAdmin.DeleteVibrationalCategory = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Vibrational Category - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletevibrationalcategory', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddGreatEight = function() {
            smqAdmin.AddGreatEight('{}');
        }

        smqAdmin.AddGreatEight = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Great Eight - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addgreateight', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetGreatEights = function() {
            smqAdmin.GetGreatEights('{}');
        }

        smqAdmin.GetGreatEights = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Great Eights - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getgreateights', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateGreatEight = function() {
            smqAdmin.UpdateGreatEight('{}');
        }

        smqAdmin.UpdateGreatEight = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Great Eight - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updategreateight', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteGreatEight = function() {
            smqAdmin.DeleteGreatEight('{}');
        }

        smqAdmin.DeleteGreatEight = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Great Eight - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletegreateight', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShardFormat = function() {
            smqAdmin.AddShardFormat('{}');
        }

        smqAdmin.AddShardFormat = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Format - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardformat', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShardFormats = function() {
            smqAdmin.GetShardFormats('{}');
        }

        smqAdmin.GetShardFormats = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Formats - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardformats', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShardFormat = function() {
            smqAdmin.UpdateShardFormat('{}');
        }

        smqAdmin.UpdateShardFormat = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Format - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardformat', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShardFormat = function() {
            smqAdmin.DeleteShardFormat('{}');
        }

        smqAdmin.DeleteShardFormat = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Format - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardformat', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShard = function() {
            smqAdmin.AddShard('{}');
        }

        smqAdmin.AddShard = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshard', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShards = function() {
            smqAdmin.GetShards('{}');
        }

        smqAdmin.GetShards = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shards - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshards', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShard = function() {
            smqAdmin.UpdateShard('{}');
        }

        smqAdmin.UpdateShard = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshard', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShard = function() {
            smqAdmin.DeleteShard('{}');
        }

        smqAdmin.DeleteShard = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshard', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddCourse = function() {
            smqAdmin.AddCourse('{}');
        }

        smqAdmin.AddCourse = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Course - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addcourse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetCourses = function() {
            smqAdmin.GetCourses('{}');
        }

        smqAdmin.GetCourses = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Courses - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getcourses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateCourse = function() {
            smqAdmin.UpdateCourse('{}');
        }

        smqAdmin.UpdateCourse = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Course - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatecourse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteCourse = function() {
            smqAdmin.DeleteCourse('{}');
        }

        smqAdmin.DeleteCourse = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Course - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletecourse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddExerciseLike = function() {
            smqAdmin.AddExerciseLike('{}');
        }

        smqAdmin.AddExerciseLike = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise Like - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexerciselike', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetExerciseLikes = function() {
            smqAdmin.GetExerciseLikes('{}');
        }

        smqAdmin.GetExerciseLikes = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercise Likes - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexerciselikes', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateExerciseLike = function() {
            smqAdmin.UpdateExerciseLike('{}');
        }

        smqAdmin.UpdateExerciseLike = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise Like - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexerciselike', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteExerciseLike = function() {
            smqAdmin.DeleteExerciseLike('{}');
        }

        smqAdmin.DeleteExerciseLike = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise Like - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexerciselike', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShardSupport = function() {
            smqAdmin.AddShardSupport('{}');
        }

        smqAdmin.AddShardSupport = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Support - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardsupport', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShardSupports = function() {
            smqAdmin.GetShardSupports('{}');
        }

        smqAdmin.GetShardSupports = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Supports - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardsupports', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShardSupport = function() {
            smqAdmin.UpdateShardSupport('{}');
        }

        smqAdmin.UpdateShardSupport = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Support - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardsupport', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShardSupport = function() {
            smqAdmin.DeleteShardSupport('{}');
        }

        smqAdmin.DeleteShardSupport = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Support - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardsupport', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddModuleExercise = function() {
            smqAdmin.AddModuleExercise('{}');
        }

        smqAdmin.AddModuleExercise = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Module Exercise - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addmoduleexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetModuleExercises = function() {
            smqAdmin.GetModuleExercises('{}');
        }

        smqAdmin.GetModuleExercises = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Module Exercises - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getmoduleexercises', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateModuleExercise = function() {
            smqAdmin.UpdateModuleExercise('{}');
        }

        smqAdmin.UpdateModuleExercise = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Module Exercise - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatemoduleexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteModuleExercise = function() {
            smqAdmin.DeleteModuleExercise('{}');
        }

        smqAdmin.DeleteModuleExercise = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Module Exercise - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletemoduleexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShardSupportType = function() {
            smqAdmin.AddShardSupportType('{}');
        }

        smqAdmin.AddShardSupportType = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Support Type - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardsupporttype', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShardSupportTypes = function() {
            smqAdmin.GetShardSupportTypes('{}');
        }

        smqAdmin.GetShardSupportTypes = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Support Types - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardsupporttypes', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShardSupportType = function() {
            smqAdmin.UpdateShardSupportType('{}');
        }

        smqAdmin.UpdateShardSupportType = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Support Type - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardsupporttype', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShardSupportType = function() {
            smqAdmin.DeleteShardSupportType('{}');
        }

        smqAdmin.DeleteShardSupportType = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Support Type - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardsupporttype', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddExerciseVibration = function() {
            smqAdmin.AddExerciseVibration('{}');
        }

        smqAdmin.AddExerciseVibration = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise Vibration - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexercisevibration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetExerciseVibrations = function() {
            smqAdmin.GetExerciseVibrations('{}');
        }

        smqAdmin.GetExerciseVibrations = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercise Vibrations - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexercisevibrations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateExerciseVibration = function() {
            smqAdmin.UpdateExerciseVibration('{}');
        }

        smqAdmin.UpdateExerciseVibration = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise Vibration - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexercisevibration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteExerciseVibration = function() {
            smqAdmin.DeleteExerciseVibration('{}');
        }

        smqAdmin.DeleteExerciseVibration = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise Vibration - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexercisevibration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddOrganization = function() {
            smqAdmin.AddOrganization('{}');
        }

        smqAdmin.AddOrganization = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Organization - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addorganization', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetOrganizations = function() {
            smqAdmin.GetOrganizations('{}');
        }

        smqAdmin.GetOrganizations = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Organizations - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getorganizations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateOrganization = function() {
            smqAdmin.UpdateOrganization('{}');
        }

        smqAdmin.UpdateOrganization = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Organization - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateorganization', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteOrganization = function() {
            smqAdmin.DeleteOrganization('{}');
        }

        smqAdmin.DeleteOrganization = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Organization - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteorganization', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddExercise = function() {
            smqAdmin.AddExercise('{}');
        }

        smqAdmin.AddExercise = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetExercises = function() {
            smqAdmin.GetExercises('{}');
        }

        smqAdmin.GetExercises = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercises - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexercises', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateExercise = function() {
            smqAdmin.UpdateExercise('{}');
        }

        smqAdmin.UpdateExercise = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteExercise = function() {
            smqAdmin.DeleteExercise('{}');
        }

        smqAdmin.DeleteExercise = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShardSupportStatuse = function() {
            smqAdmin.AddShardSupportStatuse('{}');
        }

        smqAdmin.AddShardSupportStatuse = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Support Statuse - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardsupportstatuse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShardSupportStatuses = function() {
            smqAdmin.GetShardSupportStatuses('{}');
        }

        smqAdmin.GetShardSupportStatuses = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Support Statuses - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardsupportstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShardSupportStatuse = function() {
            smqAdmin.UpdateShardSupportStatuse('{}');
        }

        smqAdmin.UpdateShardSupportStatuse = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Support Statuse - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardsupportstatuse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShardSupportStatuse = function() {
            smqAdmin.DeleteShardSupportStatuse('{}');
        }

        smqAdmin.DeleteShardSupportStatuse = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Support Statuse - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardsupportstatuse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqAdmin;
}

                    