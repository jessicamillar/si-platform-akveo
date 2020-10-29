

function generateCRUDCoordinatorActor() {
    var smqCRUDCoordinator = {
    };
    
    smqCRUDCoordinator.defer = function() {
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

    smqCRUDCoordinator.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqCRUDCoordinator.showPingPongs = true` to get verbose logging.');
        smqCRUDCoordinator.virtualHost = virtualHost;
        smqCRUDCoordinator.username = username;
        smqCRUDCoordinator.password = password;
        smqCRUDCoordinator.rabbitEndpoint = smqCRUDCoordinator.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqCRUDCoordinator.CRUDCoordinator_all_connection = {};
        smqCRUDCoordinator.messages = [];
        smqCRUDCoordinator.waitingReply = [];
        
        smqCRUDCoordinator.client = Stomp.client(smqCRUDCoordinator.rabbitEndpoint);

        smqCRUDCoordinator.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqCRUDCoordinator.showPingPongs) return;
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

        smqCRUDCoordinator.checkMessage = function(msg) {
            
                if (smqCRUDCoordinator.onGuestRequestToken) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.requesttoken'))) {
                        var rpayload = smqCRUDCoordinator.onGuestRequestToken(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestValidateTemporaryAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.validatetemporaryaccesstoken'))) {
                        var rpayload = smqCRUDCoordinator.onGuestValidateTemporaryAccessToken(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestWhoAmI) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.whoami'))) {
                        var rpayload = smqCRUDCoordinator.onGuestWhoAmI(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestWhoAreYou) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.whoareyou'))) {
                        var rpayload = smqCRUDCoordinator.onGuestWhoAreYou(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestStoreTempFile) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.utlity.guest.storetempfile'))) {
                        var rpayload = smqCRUDCoordinator.onGuestStoreTempFile(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onCRUDCoordinatorResetRabbitSassyMQConfiguration) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.crudcoordinator.resetrabbitsassymqconfiguration'))) {
                        var rpayload = smqCRUDCoordinator.onCRUDCoordinatorResetRabbitSassyMQConfiguration(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onCRUDCoordinatorResetJWTSecretKey) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.crudcoordinator.resetjwtsecretkey'))) {
                        var rpayload = smqCRUDCoordinator.onCRUDCoordinatorResetJWTSecretKey(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddStudentModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addstudentmodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddStudentModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetStudentModules) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getstudentmodules'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetStudentModules(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateStudentModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatestudentmodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateStudentModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteStudentModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletestudentmodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteStudentModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddBreathingExerciseVisualHook) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addbreathingexercisevisualhook'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddBreathingExerciseVisualHook(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetBreathingExerciseVisualHooks) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getbreathingexercisevisualhooks'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetBreathingExerciseVisualHooks(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateBreathingExerciseVisualHook) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatebreathingexercisevisualhook'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateBreathingExerciseVisualHook(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteBreathingExerciseVisualHook) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletebreathingexercisevisualhook'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteBreathingExerciseVisualHook(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddUserRole) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.adduserrole'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddUserRole(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetUserRoles) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getuserroles'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetUserRoles(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateUserRole) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateuserrole'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateUserRole(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteUserRole) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteuserrole'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteUserRole(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddUser) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.adduser'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddUser(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetUsers) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getusers'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetUsers(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateUser) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateuser'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateUser(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteUser) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteuser'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteUser(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShardOriginator) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addshardoriginator'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShardOriginator(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShardOriginators) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getshardoriginators'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShardOriginators(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShardOriginator) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateshardoriginator'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShardOriginator(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShardOriginator) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteshardoriginator'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShardOriginator(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddExerciseFavorite) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addexercisefavorite'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddExerciseFavorite(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetExerciseFavorites) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getexercisefavorites'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetExerciseFavorites(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateExerciseFavorite) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateexercisefavorite'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateExerciseFavorite(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteExerciseFavorite) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteexercisefavorite'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteExerciseFavorite(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addmodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetModules) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getmodules'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetModules(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatemodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletemodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddCourseModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addcoursemodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddCourseModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetCourseModules) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getcoursemodules'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetCourseModules(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateCourseModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatecoursemodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateCourseModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteCourseModule) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletecoursemodule'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteCourseModule(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddVibrationalCategory) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addvibrationalcategory'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddVibrationalCategory(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetVibrationalCategories) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getvibrationalcategories'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetVibrationalCategories(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateVibrationalCategory) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatevibrationalcategory'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateVibrationalCategory(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteVibrationalCategory) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletevibrationalcategory'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteVibrationalCategory(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddGreatEight) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addgreateight'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddGreatEight(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetGreatEights) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getgreateights'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetGreatEights(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateGreatEight) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updategreateight'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateGreatEight(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteGreatEight) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletegreateight'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteGreatEight(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShardFormat) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addshardformat'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShardFormat(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShardFormats) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getshardformats'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShardFormats(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShardFormat) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateshardformat'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShardFormat(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShardFormat) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteshardformat'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShardFormat(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShard) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addshard'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShard(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShards) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getshards'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShards(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShard) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateshard'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShard(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShard) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteshard'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShard(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddCourse) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addcourse'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddCourse(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetCourses) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getcourses'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetCourses(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateCourse) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatecourse'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateCourse(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteCourse) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletecourse'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteCourse(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddExerciseLike) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addexerciselike'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddExerciseLike(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetExerciseLikes) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getexerciselikes'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetExerciseLikes(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateExerciseLike) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateexerciselike'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateExerciseLike(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteExerciseLike) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteexerciselike'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteExerciseLike(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShardSupport) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addshardsupport'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShardSupport(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShardSupports) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getshardsupports'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShardSupports(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShardSupport) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateshardsupport'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShardSupport(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShardSupport) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteshardsupport'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShardSupport(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddModuleExercise) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addmoduleexercise'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddModuleExercise(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetModuleExercises) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getmoduleexercises'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetModuleExercises(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateModuleExercise) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updatemoduleexercise'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateModuleExercise(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteModuleExercise) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deletemoduleexercise'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteModuleExercise(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShardSupportType) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addshardsupporttype'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShardSupportType(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShardSupportTypes) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getshardsupporttypes'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShardSupportTypes(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShardSupportType) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateshardsupporttype'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShardSupportType(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShardSupportType) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteshardsupporttype'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShardSupportType(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddExerciseVibration) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addexercisevibration'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddExerciseVibration(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetExerciseVibrations) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getexercisevibrations'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetExerciseVibrations(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateExerciseVibration) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateexercisevibration'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateExerciseVibration(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteExerciseVibration) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteexercisevibration'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteExerciseVibration(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddOrganization) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addorganization'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddOrganization(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetOrganizations) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getorganizations'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetOrganizations(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateOrganization) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateorganization'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateOrganization(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteOrganization) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteorganization'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteOrganization(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddExercise) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addexercise'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddExercise(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetExercises) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getexercises'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetExercises(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateExercise) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateexercise'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateExercise(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteExercise) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteexercise'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteExercise(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShardSupportStatuse) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.addshardsupportstatuse'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShardSupportStatuse(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShardSupportStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.getshardsupportstatuses'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShardSupportStatuses(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShardSupportStatuse) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.updateshardsupportstatuse'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShardSupportStatuse(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShardSupportStatuse) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.crud.admin.deleteshardsupportstatuse'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShardSupportStatuse(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'Guest' can hear.
                
                // Can also hear what 'Admin' can hear.
                
               
        }

        var on_connect = function (x) {
            smqCRUDCoordinator.CRUDCoordinator_all_connection = smqCRUDCoordinator.client.subscribe("/exchange/crudcoordinator.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqCRUDCoordinator.messages.push(d);
                        smqCRUDCoordinator.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqCRUDCoordinator.showPingPongs) console.log('      --------  MESSAGE FOR smqCRUDCoordinator: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqCRUDCoordinator.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqCRUDCoordinator.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqCRUDCoordinator.waitingReply[corrID];
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

        console.log('connecting to: ' + smqCRUDCoordinator.rabbitEndpoint + ', using ' + username + '/' + password);
        smqCRUDCoordinator.client.connect(smqCRUDCoordinator.username, smqCRUDCoordinator.password, on_connect, on_error, smqCRUDCoordinator.virtualHost);
    };

    smqCRUDCoordinator.disconnect = function() {
        if (smqCRUDCoordinator && smqCRUDCoordinator.client) 
        {
            smqCRUDCoordinator.client.disconnect();
        }
    }

    smqCRUDCoordinator.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqCRUDCoordinator.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqCRUDCoordinator.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.ResetRabbitSassyMQConfiguration = function() {
            smqCRUDCoordinator.ResetRabbitSassyMQConfiguration('{}');
        }

        smqCRUDCoordinator.ResetRabbitSassyMQConfiguration = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqCRUDCoordinator.showPingPongs) console.log('Reset Rabbit Sassy M Q Configuration - ');
            smqCRUDCoordinator.client.send('/exchange/crudcoordinatormic/crudcoordinator.general.crudcoordinator.resetrabbitsassymqconfiguration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.ResetJWTSecretKey = function() {
            smqCRUDCoordinator.ResetJWTSecretKey('{}');
        }

        smqCRUDCoordinator.ResetJWTSecretKey = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqCRUDCoordinator.showPingPongs) console.log('Reset J W T Secret Key - ');
            smqCRUDCoordinator.client.send('/exchange/crudcoordinatormic/crudcoordinator.general.crudcoordinator.resetjwtsecretkey', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.GuestRequestToken = function() {
            smqCRUDCoordinator.GuestRequestToken('{}');
        }

        smqCRUDCoordinator.GuestRequestToken = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Request Token - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.requesttoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestValidateTemporaryAccessToken = function() {
            smqCRUDCoordinator.GuestValidateTemporaryAccessToken('{}');
        }

        smqCRUDCoordinator.GuestValidateTemporaryAccessToken = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Validate Temporary Access Token - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.validatetemporaryaccesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestWhoAmI = function() {
            smqCRUDCoordinator.GuestWhoAmI('{}');
        }

        smqCRUDCoordinator.GuestWhoAmI = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Who Am I - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.whoami', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestWhoAreYou = function() {
            smqCRUDCoordinator.GuestWhoAreYou('{}');
        }

        smqCRUDCoordinator.GuestWhoAreYou = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Who Are You - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.whoareyou', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestStoreTempFile = function() {
            smqCRUDCoordinator.GuestStoreTempFile('{}');
        }

        smqCRUDCoordinator.GuestStoreTempFile = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Store Temp File - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.utlity.guest.storetempfile', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Admin' can say.
            
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.AdminAddStudentModule = function() {
            smqCRUDCoordinator.AdminAddStudentModule('{}');
        }

        smqCRUDCoordinator.AdminAddStudentModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Student Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addstudentmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetStudentModules = function() {
            smqCRUDCoordinator.AdminGetStudentModules('{}');
        }

        smqCRUDCoordinator.AdminGetStudentModules = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Student Modules - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getstudentmodules', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateStudentModule = function() {
            smqCRUDCoordinator.AdminUpdateStudentModule('{}');
        }

        smqCRUDCoordinator.AdminUpdateStudentModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Student Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatestudentmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteStudentModule = function() {
            smqCRUDCoordinator.AdminDeleteStudentModule('{}');
        }

        smqCRUDCoordinator.AdminDeleteStudentModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Student Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletestudentmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddBreathingExerciseVisualHook = function() {
            smqCRUDCoordinator.AdminAddBreathingExerciseVisualHook('{}');
        }

        smqCRUDCoordinator.AdminAddBreathingExerciseVisualHook = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Breathing Exercise Visual Hook - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addbreathingexercisevisualhook', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetBreathingExerciseVisualHooks = function() {
            smqCRUDCoordinator.AdminGetBreathingExerciseVisualHooks('{}');
        }

        smqCRUDCoordinator.AdminGetBreathingExerciseVisualHooks = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Breathing Exercise Visual Hooks - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getbreathingexercisevisualhooks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateBreathingExerciseVisualHook = function() {
            smqCRUDCoordinator.AdminUpdateBreathingExerciseVisualHook('{}');
        }

        smqCRUDCoordinator.AdminUpdateBreathingExerciseVisualHook = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Breathing Exercise Visual Hook - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatebreathingexercisevisualhook', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteBreathingExerciseVisualHook = function() {
            smqCRUDCoordinator.AdminDeleteBreathingExerciseVisualHook('{}');
        }

        smqCRUDCoordinator.AdminDeleteBreathingExerciseVisualHook = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Breathing Exercise Visual Hook - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletebreathingexercisevisualhook', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddUserRole = function() {
            smqCRUDCoordinator.AdminAddUserRole('{}');
        }

        smqCRUDCoordinator.AdminAddUserRole = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add User Role - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.adduserrole', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetUserRoles = function() {
            smqCRUDCoordinator.AdminGetUserRoles('{}');
        }

        smqCRUDCoordinator.AdminGetUserRoles = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get User Roles - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getuserroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateUserRole = function() {
            smqCRUDCoordinator.AdminUpdateUserRole('{}');
        }

        smqCRUDCoordinator.AdminUpdateUserRole = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update User Role - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateuserrole', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteUserRole = function() {
            smqCRUDCoordinator.AdminDeleteUserRole('{}');
        }

        smqCRUDCoordinator.AdminDeleteUserRole = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete User Role - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteuserrole', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddUser = function() {
            smqCRUDCoordinator.AdminAddUser('{}');
        }

        smqCRUDCoordinator.AdminAddUser = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add User - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.adduser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetUsers = function() {
            smqCRUDCoordinator.AdminGetUsers('{}');
        }

        smqCRUDCoordinator.AdminGetUsers = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Users - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getusers', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateUser = function() {
            smqCRUDCoordinator.AdminUpdateUser('{}');
        }

        smqCRUDCoordinator.AdminUpdateUser = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update User - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteUser = function() {
            smqCRUDCoordinator.AdminDeleteUser('{}');
        }

        smqCRUDCoordinator.AdminDeleteUser = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete User - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShardOriginator = function() {
            smqCRUDCoordinator.AdminAddShardOriginator('{}');
        }

        smqCRUDCoordinator.AdminAddShardOriginator = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Originator - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardoriginator', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShardOriginators = function() {
            smqCRUDCoordinator.AdminGetShardOriginators('{}');
        }

        smqCRUDCoordinator.AdminGetShardOriginators = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Originators - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardoriginators', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShardOriginator = function() {
            smqCRUDCoordinator.AdminUpdateShardOriginator('{}');
        }

        smqCRUDCoordinator.AdminUpdateShardOriginator = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Originator - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardoriginator', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShardOriginator = function() {
            smqCRUDCoordinator.AdminDeleteShardOriginator('{}');
        }

        smqCRUDCoordinator.AdminDeleteShardOriginator = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Originator - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardoriginator', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddExerciseFavorite = function() {
            smqCRUDCoordinator.AdminAddExerciseFavorite('{}');
        }

        smqCRUDCoordinator.AdminAddExerciseFavorite = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise Favorite - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexercisefavorite', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetExerciseFavorites = function() {
            smqCRUDCoordinator.AdminGetExerciseFavorites('{}');
        }

        smqCRUDCoordinator.AdminGetExerciseFavorites = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercise Favorites - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexercisefavorites', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateExerciseFavorite = function() {
            smqCRUDCoordinator.AdminUpdateExerciseFavorite('{}');
        }

        smqCRUDCoordinator.AdminUpdateExerciseFavorite = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise Favorite - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexercisefavorite', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteExerciseFavorite = function() {
            smqCRUDCoordinator.AdminDeleteExerciseFavorite('{}');
        }

        smqCRUDCoordinator.AdminDeleteExerciseFavorite = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise Favorite - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexercisefavorite', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddModule = function() {
            smqCRUDCoordinator.AdminAddModule('{}');
        }

        smqCRUDCoordinator.AdminAddModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addmodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetModules = function() {
            smqCRUDCoordinator.AdminGetModules('{}');
        }

        smqCRUDCoordinator.AdminGetModules = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Modules - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getmodules', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateModule = function() {
            smqCRUDCoordinator.AdminUpdateModule('{}');
        }

        smqCRUDCoordinator.AdminUpdateModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteModule = function() {
            smqCRUDCoordinator.AdminDeleteModule('{}');
        }

        smqCRUDCoordinator.AdminDeleteModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddCourseModule = function() {
            smqCRUDCoordinator.AdminAddCourseModule('{}');
        }

        smqCRUDCoordinator.AdminAddCourseModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Course Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addcoursemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetCourseModules = function() {
            smqCRUDCoordinator.AdminGetCourseModules('{}');
        }

        smqCRUDCoordinator.AdminGetCourseModules = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Course Modules - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getcoursemodules', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateCourseModule = function() {
            smqCRUDCoordinator.AdminUpdateCourseModule('{}');
        }

        smqCRUDCoordinator.AdminUpdateCourseModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Course Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatecoursemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteCourseModule = function() {
            smqCRUDCoordinator.AdminDeleteCourseModule('{}');
        }

        smqCRUDCoordinator.AdminDeleteCourseModule = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Course Module - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletecoursemodule', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddVibrationalCategory = function() {
            smqCRUDCoordinator.AdminAddVibrationalCategory('{}');
        }

        smqCRUDCoordinator.AdminAddVibrationalCategory = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Vibrational Category - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addvibrationalcategory', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetVibrationalCategories = function() {
            smqCRUDCoordinator.AdminGetVibrationalCategories('{}');
        }

        smqCRUDCoordinator.AdminGetVibrationalCategories = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Vibrational Categories - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getvibrationalcategories', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateVibrationalCategory = function() {
            smqCRUDCoordinator.AdminUpdateVibrationalCategory('{}');
        }

        smqCRUDCoordinator.AdminUpdateVibrationalCategory = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Vibrational Category - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatevibrationalcategory', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteVibrationalCategory = function() {
            smqCRUDCoordinator.AdminDeleteVibrationalCategory('{}');
        }

        smqCRUDCoordinator.AdminDeleteVibrationalCategory = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Vibrational Category - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletevibrationalcategory', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddGreatEight = function() {
            smqCRUDCoordinator.AdminAddGreatEight('{}');
        }

        smqCRUDCoordinator.AdminAddGreatEight = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Great Eight - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addgreateight', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetGreatEights = function() {
            smqCRUDCoordinator.AdminGetGreatEights('{}');
        }

        smqCRUDCoordinator.AdminGetGreatEights = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Great Eights - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getgreateights', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateGreatEight = function() {
            smqCRUDCoordinator.AdminUpdateGreatEight('{}');
        }

        smqCRUDCoordinator.AdminUpdateGreatEight = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Great Eight - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updategreateight', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteGreatEight = function() {
            smqCRUDCoordinator.AdminDeleteGreatEight('{}');
        }

        smqCRUDCoordinator.AdminDeleteGreatEight = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Great Eight - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletegreateight', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShardFormat = function() {
            smqCRUDCoordinator.AdminAddShardFormat('{}');
        }

        smqCRUDCoordinator.AdminAddShardFormat = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Format - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardformat', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShardFormats = function() {
            smqCRUDCoordinator.AdminGetShardFormats('{}');
        }

        smqCRUDCoordinator.AdminGetShardFormats = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Formats - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardformats', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShardFormat = function() {
            smqCRUDCoordinator.AdminUpdateShardFormat('{}');
        }

        smqCRUDCoordinator.AdminUpdateShardFormat = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Format - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardformat', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShardFormat = function() {
            smqCRUDCoordinator.AdminDeleteShardFormat('{}');
        }

        smqCRUDCoordinator.AdminDeleteShardFormat = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Format - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardformat', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShard = function() {
            smqCRUDCoordinator.AdminAddShard('{}');
        }

        smqCRUDCoordinator.AdminAddShard = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshard', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShards = function() {
            smqCRUDCoordinator.AdminGetShards('{}');
        }

        smqCRUDCoordinator.AdminGetShards = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shards - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshards', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShard = function() {
            smqCRUDCoordinator.AdminUpdateShard('{}');
        }

        smqCRUDCoordinator.AdminUpdateShard = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshard', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShard = function() {
            smqCRUDCoordinator.AdminDeleteShard('{}');
        }

        smqCRUDCoordinator.AdminDeleteShard = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshard', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddCourse = function() {
            smqCRUDCoordinator.AdminAddCourse('{}');
        }

        smqCRUDCoordinator.AdminAddCourse = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Course - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addcourse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetCourses = function() {
            smqCRUDCoordinator.AdminGetCourses('{}');
        }

        smqCRUDCoordinator.AdminGetCourses = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Courses - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getcourses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateCourse = function() {
            smqCRUDCoordinator.AdminUpdateCourse('{}');
        }

        smqCRUDCoordinator.AdminUpdateCourse = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Course - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatecourse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteCourse = function() {
            smqCRUDCoordinator.AdminDeleteCourse('{}');
        }

        smqCRUDCoordinator.AdminDeleteCourse = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Course - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletecourse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddExerciseLike = function() {
            smqCRUDCoordinator.AdminAddExerciseLike('{}');
        }

        smqCRUDCoordinator.AdminAddExerciseLike = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise Like - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexerciselike', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetExerciseLikes = function() {
            smqCRUDCoordinator.AdminGetExerciseLikes('{}');
        }

        smqCRUDCoordinator.AdminGetExerciseLikes = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercise Likes - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexerciselikes', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateExerciseLike = function() {
            smqCRUDCoordinator.AdminUpdateExerciseLike('{}');
        }

        smqCRUDCoordinator.AdminUpdateExerciseLike = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise Like - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexerciselike', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteExerciseLike = function() {
            smqCRUDCoordinator.AdminDeleteExerciseLike('{}');
        }

        smqCRUDCoordinator.AdminDeleteExerciseLike = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise Like - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexerciselike', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShardSupport = function() {
            smqCRUDCoordinator.AdminAddShardSupport('{}');
        }

        smqCRUDCoordinator.AdminAddShardSupport = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Support - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardsupport', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShardSupports = function() {
            smqCRUDCoordinator.AdminGetShardSupports('{}');
        }

        smqCRUDCoordinator.AdminGetShardSupports = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Supports - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardsupports', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShardSupport = function() {
            smqCRUDCoordinator.AdminUpdateShardSupport('{}');
        }

        smqCRUDCoordinator.AdminUpdateShardSupport = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Support - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardsupport', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShardSupport = function() {
            smqCRUDCoordinator.AdminDeleteShardSupport('{}');
        }

        smqCRUDCoordinator.AdminDeleteShardSupport = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Support - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardsupport', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddModuleExercise = function() {
            smqCRUDCoordinator.AdminAddModuleExercise('{}');
        }

        smqCRUDCoordinator.AdminAddModuleExercise = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Module Exercise - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addmoduleexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetModuleExercises = function() {
            smqCRUDCoordinator.AdminGetModuleExercises('{}');
        }

        smqCRUDCoordinator.AdminGetModuleExercises = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Module Exercises - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getmoduleexercises', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateModuleExercise = function() {
            smqCRUDCoordinator.AdminUpdateModuleExercise('{}');
        }

        smqCRUDCoordinator.AdminUpdateModuleExercise = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Module Exercise - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updatemoduleexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteModuleExercise = function() {
            smqCRUDCoordinator.AdminDeleteModuleExercise('{}');
        }

        smqCRUDCoordinator.AdminDeleteModuleExercise = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Module Exercise - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deletemoduleexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShardSupportType = function() {
            smqCRUDCoordinator.AdminAddShardSupportType('{}');
        }

        smqCRUDCoordinator.AdminAddShardSupportType = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Support Type - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardsupporttype', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShardSupportTypes = function() {
            smqCRUDCoordinator.AdminGetShardSupportTypes('{}');
        }

        smqCRUDCoordinator.AdminGetShardSupportTypes = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Support Types - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardsupporttypes', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShardSupportType = function() {
            smqCRUDCoordinator.AdminUpdateShardSupportType('{}');
        }

        smqCRUDCoordinator.AdminUpdateShardSupportType = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Support Type - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardsupporttype', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShardSupportType = function() {
            smqCRUDCoordinator.AdminDeleteShardSupportType('{}');
        }

        smqCRUDCoordinator.AdminDeleteShardSupportType = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Support Type - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardsupporttype', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddExerciseVibration = function() {
            smqCRUDCoordinator.AdminAddExerciseVibration('{}');
        }

        smqCRUDCoordinator.AdminAddExerciseVibration = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise Vibration - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexercisevibration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetExerciseVibrations = function() {
            smqCRUDCoordinator.AdminGetExerciseVibrations('{}');
        }

        smqCRUDCoordinator.AdminGetExerciseVibrations = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercise Vibrations - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexercisevibrations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateExerciseVibration = function() {
            smqCRUDCoordinator.AdminUpdateExerciseVibration('{}');
        }

        smqCRUDCoordinator.AdminUpdateExerciseVibration = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise Vibration - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexercisevibration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteExerciseVibration = function() {
            smqCRUDCoordinator.AdminDeleteExerciseVibration('{}');
        }

        smqCRUDCoordinator.AdminDeleteExerciseVibration = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise Vibration - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexercisevibration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddOrganization = function() {
            smqCRUDCoordinator.AdminAddOrganization('{}');
        }

        smqCRUDCoordinator.AdminAddOrganization = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Organization - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addorganization', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetOrganizations = function() {
            smqCRUDCoordinator.AdminGetOrganizations('{}');
        }

        smqCRUDCoordinator.AdminGetOrganizations = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Organizations - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getorganizations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateOrganization = function() {
            smqCRUDCoordinator.AdminUpdateOrganization('{}');
        }

        smqCRUDCoordinator.AdminUpdateOrganization = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Organization - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateorganization', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteOrganization = function() {
            smqCRUDCoordinator.AdminDeleteOrganization('{}');
        }

        smqCRUDCoordinator.AdminDeleteOrganization = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Organization - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteorganization', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddExercise = function() {
            smqCRUDCoordinator.AdminAddExercise('{}');
        }

        smqCRUDCoordinator.AdminAddExercise = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Exercise - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetExercises = function() {
            smqCRUDCoordinator.AdminGetExercises('{}');
        }

        smqCRUDCoordinator.AdminGetExercises = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Exercises - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getexercises', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateExercise = function() {
            smqCRUDCoordinator.AdminUpdateExercise('{}');
        }

        smqCRUDCoordinator.AdminUpdateExercise = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Exercise - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteExercise = function() {
            smqCRUDCoordinator.AdminDeleteExercise('{}');
        }

        smqCRUDCoordinator.AdminDeleteExercise = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Exercise - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteexercise', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShardSupportStatuse = function() {
            smqCRUDCoordinator.AdminAddShardSupportStatuse('{}');
        }

        smqCRUDCoordinator.AdminAddShardSupportStatuse = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Shard Support Statuse - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.addshardsupportstatuse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShardSupportStatuses = function() {
            smqCRUDCoordinator.AdminGetShardSupportStatuses('{}');
        }

        smqCRUDCoordinator.AdminGetShardSupportStatuses = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shard Support Statuses - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.getshardsupportstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShardSupportStatuse = function() {
            smqCRUDCoordinator.AdminUpdateShardSupportStatuse('{}');
        }

        smqCRUDCoordinator.AdminUpdateShardSupportStatuse = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Shard Support Statuse - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.updateshardsupportstatuse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShardSupportStatuse = function() {
            smqCRUDCoordinator.AdminDeleteShardSupportStatuse('{}');
        }

        smqCRUDCoordinator.AdminDeleteShardSupportStatuse = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Shard Support Statuse - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.crud.admin.deleteshardsupportstatuse', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqCRUDCoordinator;
}

                    