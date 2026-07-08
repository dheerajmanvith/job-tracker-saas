# Migration Guide

## Old Endpoint

GET /api/v1/applications

## New Endpoint

GET /api/v2/applications

### New Feature

Use:

GET /api/v2/applications?format=summary

This returns only:

- company
- role
- status

instead of the complete application object.