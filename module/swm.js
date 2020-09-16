/* Copyright (c) 2020 A.W. Stanley.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { build as internalBuilder } from "./swm/a.js";

export class Builder {
  /// Construct the class.
  constructor(doc) {
    if (typeof(doc) === "undefined") {
      doc = document;
    }
    this.doc = doc;    
  }

  /// Builds the DOM inside 'destination'.
  ///
  /// destination must be a DOM element or an ID.
  build(destination, source) {
    // Lookup by ID.
    if (typeof(destination) === "string") {
      // Attempt to get the element by ID.
      destination = this.doc.getElementById(destination);
    }
    
    // Pull the object.
    if (typeof(destination) === "object") {
      if (!(destination.tagName === undefined)) {
        internalBuilder(this.doc, destination, source);
        return;
      }
    }
  }
}