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
        $search = $request->input('filterByLogType', '');

        $logsQuery = $employee->employeeLogs()->with('author');
        if ($search) {
            $logsQuery = $logsQuery->where('action', $search);
        }
        $logsQuery = $logsQuery->paginate(100)->withQueryString();
        
        $logsCollection = EmployeeLogViewHelper::list($logsQuery, $employee->company);
        $logTypes = EmployeeLog::groupBy('action')->selectRaw('action, count(*) as number_of_logs')->where('employee_id', $employee->id)->orderBy('action')->get();

        return Inertia::render('Employee/Logs/Index', [
            'employee' => EmployeeLogViewHelper::employee($employee),
            'logs' => $logsCollection,
            'types' => $logTypes,
            'notifications' => NotificationHelper::getNotifications(InstanceHelper::getLoggedEmployee()),
            'paginator' => PaginatorHelper::getData($logsQuery),
            'search' => $search,
        ]);
    }
}
