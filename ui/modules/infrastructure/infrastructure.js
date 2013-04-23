// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
(function($, cloudStack) {
  cloudStack.modules.infrastructure = function(module) {
    module.pluginAPI.extend({
      networkServiceProvider: function(args) {
        var name = args.name;
        var id = args.id;
        var state = args.state;
        var detailView = args.detailView;
        var listView = args.listView;

        cloudStack.sections.system.naas.networkProviders.types[id] = detailView;
        cloudStack.sections.system.subsections[listView.id] = {
          id: listView.id,
          title: name,
          listView: listView
        };

        $(window).bind('cloudStack.system.serviceProviders.makeHarcodedArray', function(event, data) {
          var nspHardcodingArray = data.nspHardcodingArray;

          nspHardcodingArray.push({
            id: id,
            name: name,
            state: state
          });
        });
      },

      resource: function(args) {
        var type = args.type;

        if (type) {
          return cloudStack.sections.system.subsections[type];
        } else {
          return false;
        }
      }
    });
  };
}(jQuery, cloudStack));
