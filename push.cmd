set script=

for /f "delims=" %%l in (push.ps1) do CALL SET script=%%script%%%%l%;

set script=%script:"=\"%

powershell -Command "%script%"
