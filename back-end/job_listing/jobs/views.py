from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

@api_view(['GET'])
def get_jobs(request):
    """
    GET API endpoint to retrieve all jobs
    """
    jobs = Job.objects.all().order_by('-created_at')
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_job(request):
    """
    POST API endpoint to create a new job
    """
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
