PROBLEM BASED sOLURION
#dasigao-problem-based solution

1. Problem Analysis
The Problem: Users lose track of automated subscriptions because they are mixed between monthly and annual billing cycles, causing "budget anxiety."

The Solution: SubSentry acts as a unified financial filter. It normalizes all costs into a single metric, making hidden costs immediately visible.

Success Metrics Reached:

Speed: Single-page dashboard allows an audit in under 2 minutes.

Clarity: Converts annual fees into predictable monthly data.

Action: Includes a prominent "CANCEL" button to stop financial leaks instantly.

2. Technical Approach
A. Structure (HTML5)
Dashboard Container: A high-visibility header (#total-burn) updates dynamically to show active spending.

Smart Data Form: The dropdown menu passes raw integers (value="1" for monthly, value="12" for yearly) straight to the script, removing the need for text translation.

Dynamic Mount Point: An empty Unordered List (#sub-list) serves as the injection point for JavaScript to insert active items.
