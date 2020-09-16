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
-----
This is the generic backend.
*/

/// Builds the DOM inside 'destination'.
///
/// destination must be a DOM element.
///
/// Source may be a string, an array, or an object.
/// Arrays and objects are stepped; strings are treated as tags.
export function build(doc, destination, source) {
    // Rule out simple constructor.
    if (Array.isArray(source)) {
        source.forEach(function(i) {
            build(doc, destination, i);
        });
        return destination;
    } else if (typeof(source) === "string") {
        destination.appendChild(doc.createElement(source));
    } else if (typeof(source) === "object") {
        if (source.hasOwnProperty("t")) {
            let d = doc.createElement(source.t);
            if (source.hasOwnProperty("c")) {
                let c = source.c;
                if (Array.isArray(c)) {
                    c.forEach(function(i) {
                        build(doc, d, i);
                    });
                }
            }
            if(source.hasOwnProperty("a")) {
                let a = source.a;
                for (const [k, v] of Object.entries(a)) {
                    if (typeof(k) === "string" && typeof(k) === "string") {
                        d.setAttribute(k,v);
                    }
                }
            }
            destination.appendChild(d);
        }
    } else {
        // Failure
        return null;
    }
}