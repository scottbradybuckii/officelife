<?php

namespace App\Http\Controllers\Company\Employee;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Helpers\InstanceHelper;
use App\Helpers\PaginatorHelper;
use App\Models\Company\Employee;
use App\Models\Company\EmployeeLog;
use Illuminate\Routing\Redirector;
use App\Helpers\NotificationHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\ViewHelpers\Employee\EmployeeLogViewHelper;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EmployeeLogsController extends Controller
{
    /**
     * Show the employee log.
     *
     * @param Request $request
     * @param int $companyId
     * @param int $employeeId
     *
     * @return \Inertia\Response|Redirector|RedirectResponse
     */
    public function index(Request $request, int $companyId, int $employeeId)
    {
        try {
            $employee = Employee::where('company_id', $companyId)
                ->findOrFail($employeeId);
        } catch (ModelNotFoundException $e) {
            return redirect('home');
        }

        try {
            $this->asUser(Auth::user())
                ->forEmployee($employee)
                ->forCompanyId($companyId)
                ->asPermissionLevel(config('officelife.permission_level.hr'))
                ->canAccessCurrentPage();
        } catch (\Exception $e) {
            return redirect('/home');
        }

        // logs
        if(!$request->get('filterByLogType') || $request->get('filterByLogType') == "show_all_log_types") {
            $logs = $employee->employeeLogs()->with('author')->paginate(100)->withQueryString();
            $search = "show_all_log_types";
        } else {
            $logs = $employee->employeeLogs()->with('author')->where('action', $request->get('filterByLogType'))->paginate(100)->withQueryString();
            $search = $request->get('filterByLogType');
        }
        $logsCollection = EmployeeLogViewHelper::list($logs, $employee->company);
        $logTypes = EmployeeLog::groupBy('action')->selectRaw('action, count(*) as number_of_logs')->where('employee_id', $employee->id)->orderBy('action')->get();

        return Inertia::render('Employee/Logs/Index', [
            'employee' => EmployeeLogViewHelper::employee($employee),
            'logs' => $logsCollection,
            'types' => EmployeeLogViewHelper::employeeLogTypes($logTypes),
            'notifications' => NotificationHelper::getNotifications(InstanceHelper::getLoggedEmployee()),
            'paginator' => PaginatorHelper::getData($logs),
            'search' => $search,
            'url' => route('employee.show.logs', [
              'company' => $employee->company,
              'employee' => $employee,
            ]),
        ]);
    }
}
