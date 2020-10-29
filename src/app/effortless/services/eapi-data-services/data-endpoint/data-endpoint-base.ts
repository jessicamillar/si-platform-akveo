/*
THIS FILE IS DERIVED - CHANGES WILL BE OVERWRITTEN (derived)
*/
import { EapiEndpointBase } from './eapi-endpoint-base';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { GDS } from '../../gds.service';

export class DataEndpointBase extends EapiEndpointBase {

    constructor(public gds: GDS) {
        super(gds)
    }






    // HANDLERS FOR: StudentModule
    public studentmodule: any = {};
    public studentmodules: any[] = [];
    public studentmodulesById: any = {};
    public studentmodule$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public studentmodules$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onStudentModulesChange(): Observable<any> {
        return this.studentmodules$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onStudentModuleChange(): Observable<any> {
        return this.studentmodule$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadStudentModules(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'StudentModuleId', 'studentmodules', 'StudentModules', '', sortField, true, behaviorSubject);
    }

    public async reloadStudentModulesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'StudentModuleId', 'studentmodules', 'StudentModules', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadStudentModuleWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'StudentModuleId', 'studentmodule', 'StudentModules', airtableWhere, sortField, false, behaviorSubject);
    }

    public studentmodulesSort(studentmoduleA: any, studentmoduleB: any) {
        return EapiEndpointBase.defaultSort(studentmoduleA, studentmoduleB);
    } 





    // HANDLERS FOR: BreathingExerciseVisualHook
    public breathingexercisevisualhook: any = {};
    public breathingexercisevisualhooks: any[] = [];
    public breathingexercisevisualhooksById: any = {};
    public breathingexercisevisualhook$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public breathingexercisevisualhooks$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onBreathingExerciseVisualHooksChange(): Observable<any> {
        return this.breathingexercisevisualhooks$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onBreathingExerciseVisualHookChange(): Observable<any> {
        return this.breathingexercisevisualhook$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadBreathingExerciseVisualHooks(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'BreathingExerciseVisualHookId', 'breathingexercisevisualhooks', 'BreathingExerciseVisualHooks', '', sortField, true, behaviorSubject);
    }

    public async reloadBreathingExerciseVisualHooksWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'BreathingExerciseVisualHookId', 'breathingexercisevisualhooks', 'BreathingExerciseVisualHooks', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadBreathingExerciseVisualHookWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'BreathingExerciseVisualHookId', 'breathingexercisevisualhook', 'BreathingExerciseVisualHooks', airtableWhere, sortField, false, behaviorSubject);
    }

    public breathingexercisevisualhooksSort(breathingexercisevisualhookA: any, breathingexercisevisualhookB: any) {
        return EapiEndpointBase.defaultSort(breathingexercisevisualhookA, breathingexercisevisualhookB);
    } 





    // HANDLERS FOR: UserRole
    public userrole: any = {};
    public userroles: any[] = [];
    public userrolesById: any = {};
    public userrole$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public userroles$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onUserRolesChange(): Observable<any> {
        return this.userroles$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onUserRoleChange(): Observable<any> {
        return this.userrole$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadUserRoles(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'UserRoleId', 'userroles', 'UserRoles', '', sortField, true, behaviorSubject);
    }

    public async reloadUserRolesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'UserRoleId', 'userroles', 'UserRoles', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadUserRoleWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'UserRoleId', 'userrole', 'UserRoles', airtableWhere, sortField, false, behaviorSubject);
    }

    public userrolesSort(userroleA: any, userroleB: any) {
        return EapiEndpointBase.defaultSort(userroleA, userroleB);
    } 





    // HANDLERS FOR: User
    public user: any = {};
    public users: any[] = [];
    public usersById: any = {};
    public user$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public users$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onUsersChange(): Observable<any> {
        return this.users$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onUserChange(): Observable<any> {
        return this.user$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadUsers(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'UserId', 'users', 'Users', '', sortField, true, behaviorSubject);
    }

    public async reloadUsersWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'UserId', 'users', 'Users', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadUserWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'UserId', 'user', 'Users', airtableWhere, sortField, false, behaviorSubject);
    }

    public usersSort(userA: any, userB: any) {
        return EapiEndpointBase.defaultSort(userA, userB);
    } 





    // HANDLERS FOR: ShardOriginator
    public shardoriginator: any = {};
    public shardoriginators: any[] = [];
    public shardoriginatorsById: any = {};
    public shardoriginator$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shardoriginators$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShardOriginatorsChange(): Observable<any> {
        return this.shardoriginators$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onShardOriginatorChange(): Observable<any> {
        return this.shardoriginator$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadShardOriginators(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardOriginatorId', 'shardoriginators', 'ShardOriginators', '', sortField, true, behaviorSubject);
    }

    public async reloadShardOriginatorsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardOriginatorId', 'shardoriginators', 'ShardOriginators', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadShardOriginatorWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardOriginatorId', 'shardoriginator', 'ShardOriginators', airtableWhere, sortField, false, behaviorSubject);
    }

    public shardoriginatorsSort(shardoriginatorA: any, shardoriginatorB: any) {
        return EapiEndpointBase.defaultSort(shardoriginatorA, shardoriginatorB);
    } 





    // HANDLERS FOR: ExerciseFavorite
    public exercisefavorite: any = {};
    public exercisefavorites: any[] = [];
    public exercisefavoritesById: any = {};
    public exercisefavorite$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public exercisefavorites$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onExerciseFavoritesChange(): Observable<any> {
        return this.exercisefavorites$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onExerciseFavoriteChange(): Observable<any> {
        return this.exercisefavorite$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadExerciseFavorites(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseFavoriteId', 'exercisefavorites', 'ExerciseFavorites', '', sortField, true, behaviorSubject);
    }

    public async reloadExerciseFavoritesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseFavoriteId', 'exercisefavorites', 'ExerciseFavorites', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadExerciseFavoriteWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseFavoriteId', 'exercisefavorite', 'ExerciseFavorites', airtableWhere, sortField, false, behaviorSubject);
    }

    public exercisefavoritesSort(exercisefavoriteA: any, exercisefavoriteB: any) {
        return EapiEndpointBase.defaultSort(exercisefavoriteA, exercisefavoriteB);
    } 





    // HANDLERS FOR: Module
    public module: any = {};
    public modules: any[] = [];
    public modulesById: any = {};
    public module$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public modules$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onModulesChange(): Observable<any> {
        return this.modules$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onModuleChange(): Observable<any> {
        return this.module$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadModules(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ModuleId', 'modules', 'Modules', '', sortField, true, behaviorSubject);
    }

    public async reloadModulesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ModuleId', 'modules', 'Modules', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadModuleWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ModuleId', 'module', 'Modules', airtableWhere, sortField, false, behaviorSubject);
    }

    public modulesSort(moduleA: any, moduleB: any) {
        return EapiEndpointBase.defaultSort(moduleA, moduleB);
    } 





    // HANDLERS FOR: CourseModule
    public coursemodule: any = {};
    public coursemodules: any[] = [];
    public coursemodulesById: any = {};
    public coursemodule$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public coursemodules$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onCourseModulesChange(): Observable<any> {
        return this.coursemodules$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onCourseModuleChange(): Observable<any> {
        return this.coursemodule$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadCourseModules(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'CourseModuleId', 'coursemodules', 'CourseModules', '', sortField, true, behaviorSubject);
    }

    public async reloadCourseModulesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'CourseModuleId', 'coursemodules', 'CourseModules', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadCourseModuleWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'CourseModuleId', 'coursemodule', 'CourseModules', airtableWhere, sortField, false, behaviorSubject);
    }

    public coursemodulesSort(coursemoduleA: any, coursemoduleB: any) {
        return EapiEndpointBase.defaultSort(coursemoduleA, coursemoduleB);
    } 





    // HANDLERS FOR: VibrationalCategory
    public vibrationalcategory: any = {};
    public vibrationalcategories: any[] = [];
    public vibrationalcategoriesById: any = {};
    public vibrationalcategory$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public vibrationalcategories$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onVibrationalCategoriesChange(): Observable<any> {
        return this.vibrationalcategories$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onVibrationalCategoryChange(): Observable<any> {
        return this.vibrationalcategory$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadVibrationalCategories(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'VibrationalCategoryId', 'vibrationalcategories', 'VibrationalCategories', '', sortField, true, behaviorSubject);
    }

    public async reloadVibrationalCategoriesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'VibrationalCategoryId', 'vibrationalcategories', 'VibrationalCategories', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadVibrationalCategoryWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'VibrationalCategoryId', 'vibrationalcategory', 'VibrationalCategories', airtableWhere, sortField, false, behaviorSubject);
    }

    public vibrationalcategoriesSort(vibrationalcategoryA: any, vibrationalcategoryB: any) {
        return EapiEndpointBase.defaultSort(vibrationalcategoryA, vibrationalcategoryB);
    } 





    // HANDLERS FOR: GreatEight
    public greateight: any = {};
    public greateights: any[] = [];
    public greateightsById: any = {};
    public greateight$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public greateights$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onGreatEightsChange(): Observable<any> {
        return this.greateights$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onGreatEightChange(): Observable<any> {
        return this.greateight$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadGreatEights(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'GreatEightId', 'greateights', 'GreatEights', '', sortField, true, behaviorSubject);
    }

    public async reloadGreatEightsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'GreatEightId', 'greateights', 'GreatEights', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadGreatEightWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'GreatEightId', 'greateight', 'GreatEights', airtableWhere, sortField, false, behaviorSubject);
    }

    public greateightsSort(greateightA: any, greateightB: any) {
        return EapiEndpointBase.defaultSort(greateightA, greateightB);
    } 





    // HANDLERS FOR: ShardFormat
    public shardformat: any = {};
    public shardformats: any[] = [];
    public shardformatsById: any = {};
    public shardformat$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shardformats$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShardFormatsChange(): Observable<any> {
        return this.shardformats$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onShardFormatChange(): Observable<any> {
        return this.shardformat$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadShardFormats(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardFormatId', 'shardformats', 'ShardFormats', '', sortField, true, behaviorSubject);
    }

    public async reloadShardFormatsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardFormatId', 'shardformats', 'ShardFormats', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadShardFormatWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardFormatId', 'shardformat', 'ShardFormats', airtableWhere, sortField, false, behaviorSubject);
    }

    public shardformatsSort(shardformatA: any, shardformatB: any) {
        return EapiEndpointBase.defaultSort(shardformatA, shardformatB);
    } 





    // HANDLERS FOR: Shard
    public shard: any = {};
    public shards: any[] = [];
    public shardsById: any = {};
    public shard$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shards$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShardsChange(): Observable<any> {
        return this.shards$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onShardChange(): Observable<any> {
        return this.shard$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadShards(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardId', 'shards', 'Shards', '', sortField, true, behaviorSubject);
    }

    public async reloadShardsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardId', 'shards', 'Shards', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadShardWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardId', 'shard', 'Shards', airtableWhere, sortField, false, behaviorSubject);
    }

    public shardsSort(shardA: any, shardB: any) {
        return EapiEndpointBase.defaultSort(shardA, shardB);
    } 





    // HANDLERS FOR: Course
    public course: any = {};
    public courses: any[] = [];
    public coursesById: any = {};
    public course$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public courses$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onCoursesChange(): Observable<any> {
        return this.courses$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onCourseChange(): Observable<any> {
        return this.course$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadCourses(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'CourseId', 'courses', 'Courses', '', sortField, true, behaviorSubject);
    }

    public async reloadCoursesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'CourseId', 'courses', 'Courses', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadCourseWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'CourseId', 'course', 'Courses', airtableWhere, sortField, false, behaviorSubject);
    }

    public coursesSort(courseA: any, courseB: any) {
        return EapiEndpointBase.defaultSort(courseA, courseB);
    } 





    // HANDLERS FOR: ExerciseLike
    public exerciselike: any = {};
    public exerciselikes: any[] = [];
    public exerciselikesById: any = {};
    public exerciselike$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public exerciselikes$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onExerciseLikesChange(): Observable<any> {
        return this.exerciselikes$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onExerciseLikeChange(): Observable<any> {
        return this.exerciselike$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadExerciseLikes(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseLikeId', 'exerciselikes', 'ExerciseLikes', '', sortField, true, behaviorSubject);
    }

    public async reloadExerciseLikesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseLikeId', 'exerciselikes', 'ExerciseLikes', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadExerciseLikeWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseLikeId', 'exerciselike', 'ExerciseLikes', airtableWhere, sortField, false, behaviorSubject);
    }

    public exerciselikesSort(exerciselikeA: any, exerciselikeB: any) {
        return EapiEndpointBase.defaultSort(exerciselikeA, exerciselikeB);
    } 





    // HANDLERS FOR: ShardSupport
    public shardsupport: any = {};
    public shardsupports: any[] = [];
    public shardsupportsById: any = {};
    public shardsupport$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shardsupports$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShardSupportsChange(): Observable<any> {
        return this.shardsupports$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onShardSupportChange(): Observable<any> {
        return this.shardsupport$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadShardSupports(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportId', 'shardsupports', 'ShardSupports', '', sortField, true, behaviorSubject);
    }

    public async reloadShardSupportsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportId', 'shardsupports', 'ShardSupports', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadShardSupportWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportId', 'shardsupport', 'ShardSupports', airtableWhere, sortField, false, behaviorSubject);
    }

    public shardsupportsSort(shardsupportA: any, shardsupportB: any) {
        return EapiEndpointBase.defaultSort(shardsupportA, shardsupportB);
    } 





    // HANDLERS FOR: ModuleExercise
    public moduleexercise: any = {};
    public moduleexercises: any[] = [];
    public moduleexercisesById: any = {};
    public moduleexercise$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public moduleexercises$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onModuleExercisesChange(): Observable<any> {
        return this.moduleexercises$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onModuleExerciseChange(): Observable<any> {
        return this.moduleexercise$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadModuleExercises(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ModuleExerciseId', 'moduleexercises', 'ModuleExercises', '', sortField, true, behaviorSubject);
    }

    public async reloadModuleExercisesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ModuleExerciseId', 'moduleexercises', 'ModuleExercises', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadModuleExerciseWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ModuleExerciseId', 'moduleexercise', 'ModuleExercises', airtableWhere, sortField, false, behaviorSubject);
    }

    public moduleexercisesSort(moduleexerciseA: any, moduleexerciseB: any) {
        return EapiEndpointBase.defaultSort(moduleexerciseA, moduleexerciseB);
    } 





    // HANDLERS FOR: ShardSupportType
    public shardsupporttype: any = {};
    public shardsupporttypes: any[] = [];
    public shardsupporttypesById: any = {};
    public shardsupporttype$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shardsupporttypes$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShardSupportTypesChange(): Observable<any> {
        return this.shardsupporttypes$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onShardSupportTypeChange(): Observable<any> {
        return this.shardsupporttype$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadShardSupportTypes(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportTypeId', 'shardsupporttypes', 'ShardSupportTypes', '', sortField, true, behaviorSubject);
    }

    public async reloadShardSupportTypesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportTypeId', 'shardsupporttypes', 'ShardSupportTypes', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadShardSupportTypeWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportTypeId', 'shardsupporttype', 'ShardSupportTypes', airtableWhere, sortField, false, behaviorSubject);
    }

    public shardsupporttypesSort(shardsupporttypeA: any, shardsupporttypeB: any) {
        return EapiEndpointBase.defaultSort(shardsupporttypeA, shardsupporttypeB);
    } 





    // HANDLERS FOR: ExerciseVibration
    public exercisevibration: any = {};
    public exercisevibrations: any[] = [];
    public exercisevibrationsById: any = {};
    public exercisevibration$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public exercisevibrations$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onExerciseVibrationsChange(): Observable<any> {
        return this.exercisevibrations$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onExerciseVibrationChange(): Observable<any> {
        return this.exercisevibration$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadExerciseVibrations(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseVibrationId', 'exercisevibrations', 'ExerciseVibrations', '', sortField, true, behaviorSubject);
    }

    public async reloadExerciseVibrationsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseVibrationId', 'exercisevibrations', 'ExerciseVibrations', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadExerciseVibrationWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseVibrationId', 'exercisevibration', 'ExerciseVibrations', airtableWhere, sortField, false, behaviorSubject);
    }

    public exercisevibrationsSort(exercisevibrationA: any, exercisevibrationB: any) {
        return EapiEndpointBase.defaultSort(exercisevibrationA, exercisevibrationB);
    } 





    // HANDLERS FOR: Organization
    public organization: any = {};
    public organizations: any[] = [];
    public organizationsById: any = {};
    public organization$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public organizations$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onOrganizationsChange(): Observable<any> {
        return this.organizations$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onOrganizationChange(): Observable<any> {
        return this.organization$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadOrganizations(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'OrganizationId', 'organizations', 'Organizations', '', sortField, true, behaviorSubject);
    }

    public async reloadOrganizationsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'OrganizationId', 'organizations', 'Organizations', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadOrganizationWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'OrganizationId', 'organization', 'Organizations', airtableWhere, sortField, false, behaviorSubject);
    }

    public organizationsSort(organizationA: any, organizationB: any) {
        return EapiEndpointBase.defaultSort(organizationA, organizationB);
    } 





    // HANDLERS FOR: Exercise
    public exercise: any = {};
    public exercises: any[] = [];
    public exercisesById: any = {};
    public exercise$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public exercises$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onExercisesChange(): Observable<any> {
        return this.exercises$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onExerciseChange(): Observable<any> {
        return this.exercise$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadExercises(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseId', 'exercises', 'Exercises', '', sortField, true, behaviorSubject);
    }

    public async reloadExercisesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseId', 'exercises', 'Exercises', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadExerciseWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ExerciseId', 'exercise', 'Exercises', airtableWhere, sortField, false, behaviorSubject);
    }

    public exercisesSort(exerciseA: any, exerciseB: any) {
        return EapiEndpointBase.defaultSort(exerciseA, exerciseB);
    } 





    // HANDLERS FOR: ShardSupportStatuse
    public shardsupportstatuse: any = {};
    public shardsupportstatuses: any[] = [];
    public shardsupportstatusesById: any = {};
    public shardsupportstatuse$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shardsupportstatuses$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShardSupportStatusesChange(): Observable<any> {
        return this.shardsupportstatuses$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onShardSupportStatuseChange(): Observable<any> {
        return this.shardsupportstatuse$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadShardSupportStatuses(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportStatuseId', 'shardsupportstatuses', 'ShardSupportStatuses', '', sortField, true, behaviorSubject);
    }

    public async reloadShardSupportStatusesWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportStatuseId', 'shardsupportstatuses', 'ShardSupportStatuses', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadShardSupportStatuseWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ShardSupportStatuseId', 'shardsupportstatuse', 'ShardSupportStatuses', airtableWhere, sortField, false, behaviorSubject);
    }

    public shardsupportstatusesSort(shardsupportstatuseA: any, shardsupportstatuseB: any) {
        return EapiEndpointBase.defaultSort(shardsupportstatuseA, shardsupportstatuseB);
    } 

}
