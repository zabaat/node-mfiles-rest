// M-Files Web Service enumerations
//
// This file contains the definitions for M-Files Web Service enumerations
// for use in JavaScript applications.

// Copyright 2012 M-Files Corporation
// http://www.m-files.com/
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

if( !MFWS ) MFWS = {};

MFWS.Enumerations = {
    
    MFCheckOutStatus: {
		'CheckedIn': 0,
		'CheckedOut': 1,
		'CheckedOutToMe': 2
	},
        
    MFRefreshStatus: {
		'None': 0,
		'Quick': 1,
		'Full': 2
	},
        
    MFObjectVersionFlag: {
		'None': 0,
		'Completed': 1,
		'HasRelatedObjects': 2
	},
        
    MFAuthType: {
		'Unknown': 0,
		'LoggedOnWindowsUser': 1,
		'SpecificWindowsUser': 2,
		'SpecificMFilesUser': 3
	},
        
    MFACLMode: {
		'Simple': 0,
		'AutomaticPermissionsWithComponents': 1
	},
        
    MFDataType: {
		'Uninitialized': 0,
		'Text': 1,
		'Integer': 2,
		'Floating': 3,
		'Date': 5,
		'Time': 6,
		'Timestamp': 7,
		'Boolean': 8,
		'Lookup': 9,
		'MultiSelectLookup': 10,
		'Integer64': 11,
		'FILETIME': 12,
		'MultiLineText': 13,
		'ACL': 14
	},
        
    MFAutomaticValueType: {
		'None': 0,
		'CalculatedWithPlaceholders': 1,
		'CalculatedWithVBScript': 2,
		'AutoNumberSimple': 3,
		'WithVBScript': 4
	},
        
    MFFolderContentItemType: {
		'Unknown': 0,
		'ViewFolder': 1,
		'PropertyFolder': 2,
		'TraditionalFolder': 3,
		'ObjectVersion': 4
	}
}

module.exports = MFWS