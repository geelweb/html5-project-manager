#!/bin/bash

BASE_DIR=`dirname $0`

testacular start $BASE_DIR/../config/testacular.conf.js $*
