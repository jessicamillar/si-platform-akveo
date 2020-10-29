import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'ngx-base-data'
})
export class BaseDataComponent  {

  public tables: { title: string, link: string}[] = [

    {
      title: 'StudentModules',
      link: 'studentmodules',
    },
    {
      title: 'BreathingExerciseVisualHooks',
      link: 'breathingexercisevisualhooks',
    },
    {
      title: 'UserRoles',
      link: 'userroles',
    },
    {
      title: 'Users',
      link: 'users',
    },
    {
      title: 'ShardOriginators',
      link: 'shardoriginators',
    },
    {
      title: 'ExerciseFavorites',
      link: 'exercisefavorites',
    },
    {
      title: 'Modules',
      link: 'modules',
    },
    {
      title: 'CourseModules',
      link: 'coursemodules',
    },
    {
      title: 'VibrationalCategories',
      link: 'vibrationalcategories',
    },
    {
      title: 'GreatEights',
      link: 'greateights',
    },
    {
      title: 'ShardFormats',
      link: 'shardformats',
    },
    {
      title: 'Shards',
      link: 'shards',
    },
    {
      title: 'Courses',
      link: 'courses',
    },
    {
      title: 'ExerciseLikes',
      link: 'exerciselikes',
    },
    {
      title: 'ShardSupports',
      link: 'shardsupports',
    },
    {
      title: 'ModuleExercises',
      link: 'moduleexercises',
    },
    {
      title: 'ShardSupportTypes',
      link: 'shardsupporttypes',
    },
    {
      title: 'ExerciseVibrations',
      link: 'exercisevibrations',
    },
    {
      title: 'Organizations',
      link: 'organizations',
    },
    {
      title: 'Exercises',
      link: 'exercises',
    },
    {
      title: 'ShardSupportStatuses',
      link: 'shardsupportstatuses',
    },
  ];
}